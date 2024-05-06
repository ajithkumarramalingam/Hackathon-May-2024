import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/core/utils/util.service';
import { sessionApiList } from 'src/app/core/variables/api-list';
import { approveTypes } from 'src/app/core/variables/enum';
import { IMaster, ISessionDetails } from 'src/app/core/variables/interface';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  adminDetailsForm: FormGroup;
  useSessionDetails: Array<any> = [];
  approvalDetails: Array<IMaster> = [];

  editId!: number;

  approvalDialogBox: boolean = false;
  pendingFlag!: boolean;

  selectDate: Date = new Date;

  search = new Subject<string>();
  searchText!: string;
  approvalEventFlag: boolean = true;

  objectData = {
    search: '',
    date: ''
  };

  ngOnInit() {
    this.getUserSessionDetails();
    this.getMasterApprovalTypes();
  }

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private utilService: UtilService,
    private router: Router
  ){
    this.searchData();
    this.adminDetailsForm = this.fb.group({
      approvalId: [null, [Validators.required]],
      fromTime: [null],
      toTime: [null, [Validators.required]]
    });
  }

  selectedDate() {
    this.getUserSessionDetails();
  }

  get adminForm() {
    return this.adminDetailsForm.controls;
  }

  adminCols = [
    { header: 'Name', field: 'name' },
    { header: 'Department', field: 'departmentName' },
    { header: 'Designation', field: 'designationName' },
    { header: 'Date', field: 'date' },
    {header: 'Requested Date', field: 'requestedDate'},
    { header: 'Status', field: 'approvalId' },
    { header: 'Topic', field: 'topic' },
    { header: 'Take Hrs', field: 'takingHrs' },
  ];
  
  openPopUpModal(data: ISessionDetails) {
    this.adminDetailsForm.reset();
    this.approvalDialogBox = true;
    this.editId = data.id;
    this.pendingFlag = data.approvalId == approveTypes.PENDING ? true : false;
    console.log('data',data);
    data.fromTime = data.fromTime ? new Date(data.fromTime) : null;
    data.toTime = data.toTime ? new Date(data.toTime) : null;
    this.adminDetailsForm.patchValue(data);
  }

  rejectPopUp() {
    this.utilService.errorToast('This is rejection not open modal');
  }

  searchData() {
    this.search.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value: string) => {
      if (value.length >= 1 || value.length == 0) {
        if (value.length == 0) {
          this.objectData.search = '';
          this.getUserSessionDetails()
        }
        else {
          this.objectData.search = value;
          this.getUserSessionDetails()
        }
      }
    })
  }

  getUserSessionDetails() {
    this.objectData.date = moment(this.selectDate).format('YYYY-MM-DD');
    this.apiService.getSearchData(sessionApiList.getUserSessionDetails, this.objectData).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.useSessionDetails = res.data;
          res.data.forEach((e: any) => {
            e.date = moment(e.date).format('DD-MM-YYYY');
            e.requestedDate = moment(e.requestedDate).format('DD-MM-YYYY');
          })
        } else {
          this.utilService.errorToast(res.message);
        }
      }, error: (err: HttpErrorResponse) => {
        console.log('err',err);
        this.utilService.errorToast(err.message);
      }
    });
  }

  getMasterApprovalTypes() {
    this.apiService.get(sessionApiList.getMasterApprovalTypes).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.approvalDetails = res.data;
        } else {
          this.utilService.errorToast(res.message);
        }
      }, error: (err: HttpErrorResponse) => {
        console.log('err',err);
        this.utilService.errorToast(err.message);
      }
    });
  }

  saveAdminApproval() {
    // if (this.adminDetailsForm.invalid) {
    //   return this.adminDetailsForm.markAllAsTouched();      
    // }

    const data = {
      id: this.editId,
      approvalId: this.adminDetailsForm.value.approvalId,
      fromTime: this.adminDetailsForm.value.fromTime ? new Date(this.adminDetailsForm.value.fromTime) : null,
      toTime: this.adminDetailsForm.value.toTime ? new Date(this.adminDetailsForm.value.toTime) : null
    }

    console.log('data',data);
    this.apiService.post(sessionApiList.adminApproved, data).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.utilService.successToast(res.message);
          this.getUserSessionDetails();
          this.approvalDialogBox = false;
        } else {
          this.utilService.errorToast(res.message);
        }
      }, error: (err: HttpErrorResponse) => {
        console.log('err',err);
        this.utilService.errorToast(err.message);
      }
    });
  }

  cancel() {
    this.approvalDialogBox = false;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  selectEvent(data: any) {
    console.log('data',data);
    this.approvalEventFlag = data == approveTypes.REJECTED ? false : true;
    console.log('this.approvalEventFlag',this.approvalEventFlag);
  }
}
