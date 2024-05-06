import { HttpErrorResponse } from '@angular/common/http';
import { BootstrapOptions, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { UtilService } from 'src/app/core/utils/util.service';
import { sessionApiList } from 'src/app/core/variables/api-list';
import { approveTypes } from 'src/app/core/variables/enum';
import { IGetDetailsResponse, IGetResponse, IMaster, ISaveResponse, ISessionDetails } from 'src/app/core/variables/interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  sessionFrom: FormGroup;
  sessionOpenFlag: boolean = false;
  sessionEdit: boolean = false;
  editSideBar: boolean = false;
  statusFlag!: boolean;

  departmentDetails: Array<IMaster> = [];
  designationDetails: Array<IMaster> = [];
  teamLeadsDetails: Array<IMaster> = [];
  sessionDetails: Array<ISessionDetails> = [];

  editSessionDetails!: ISessionDetails;

  editId!: number;
  removeId!: number;

  currentDate: Date = new Date(moment().format('YYYY-MM-DD'));
  selectDate: Date = new Date;

  search = new Subject<string>();
  searchText!: string;

  objectData = {
    search: '',
    date: ''
  };

  sessionCols = [
    { header: 'Department', field: 'departmentName' },
    { header: 'Designation', field: 'designationName' },
    { header: 'Date', field: 'date' },
    {header: 'Requested Date', field: 'requestedDate'},
    { header: 'Status', field: 'approvalId' },
  ];

  cards = [
    { count: 0, name: '' },
    { count: 0, name: '' },
    { count: 0, name: '' },
    { count: 0, name: '' }
  ]

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private utilService: UtilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.searchData();
    this.sessionFrom = this.fb.group({
      topic: [null,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z&$%#@!*]+( [a-zA-Z&$%#@!*<>;]+)*$/),
          Validators.minLength(3), Validators.maxLength(100)
        ]],
      date: [null,
        [
          Validators.required
        ]],
      departmentId: [null,
        [
          Validators.required
        ]],
      leadId: [null],
      designationId: [null,
        [
          Validators.required
        ]],
      takingHrs: [null,
        [
          Validators.required
        ]]
    })
  }

  searchData() {
    this.search.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value: string) => {
      if (value.length >= 1 || value.length == 0) {
        if (value.length == 0) {
          this.objectData.search = '';
          this.getSessionDetails()
        }
        else {
          this.objectData.search = value;
          this.getSessionDetails()
        }
      }
    })
  }

  ngOnInit() {
    this.getMasterData();
    this.getSessionDetails();
  }

 selectedDate() {
    this.getSessionDetails();
  } 

  get form() {
    return this.sessionFrom.controls;
  }

  openSessionFrom() {
    this.sessionOpenFlag = true;
    this.sessionFrom.reset();
    this.sessionEdit = false;
  }

  cancel() {
    this.sessionOpenFlag = false;
    this.sessionFrom.reset();
  }

  saveSessionDetails() {
    console.log('this.sessionEdit', this.sessionEdit);
    console.log('this.sessionFrom.value',this.sessionFrom.value);
    let data;
    if (this.sessionFrom.invalid) {
      return this.sessionFrom.markAllAsTouched();
    }
    if (!this.sessionEdit) {
      data = {
        topic: this.sessionFrom.value.topic,
        date: moment(this.sessionFrom.value.date).format('YYYY-MM-DD'),
        departmentId: this.sessionFrom.value.departmentId,
        leadId: this.sessionFrom.value.leadId,
        designationId: this.sessionFrom.value.designationId,
        takingHrs: this.sessionFrom.value.takingHrs,
      }
    } else {
      data = {
        id: this.editId,
        topic: this.sessionFrom.value.topic,
        date: moment(this.sessionFrom.value.date).format('YYYY-MM-DD'),
        departmentId: this.sessionFrom.value.departmentId,
        leadId: this.sessionFrom.value.leadId,
        designationId: this.sessionFrom.value.designationId,
        takingHrs: this.sessionFrom.value.takingHrs,
      }
    }
    console.log('data---------', data);
    this.apiService.post(sessionApiList.saveSessionDetails, data).subscribe({
      next: (res: ISaveResponse) => {
        if (res.status) {
          this.utilService.successToast(res.message);
          this.getSessionDetails();
          this.sessionOpenFlag = false;
        } else {
          this.utilService.errorToast(res.message);
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.errorToast(err.message);
      }
    })
  }

  getMasterData() {
    this.apiService.get(sessionApiList.getMasterData).subscribe({
      next: (res: IGetResponse) => {
        if (res.status) {
          this.departmentDetails = res.departmentDetails;
          this.designationDetails = res.designationDetails;
          this.teamLeadsDetails = res.teamLeadsDetails;
        } else {
          this.utilService.errorToast(res.message);
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.errorToast(err.message);
      }
    })
  }

  getSessionDetails() {
    this.objectData.date = moment(this.selectDate).format('YYYY-MM-DD');
    console.log('this.objectData',this.objectData);
    this.apiService.getSearchData(sessionApiList.getSessionDetails, this.objectData).subscribe({
      next: (res: IGetDetailsResponse) => {
        if (res.status) {
          this.sessionDetails = res.data;
          res.data.forEach(e => {
            e.date = moment(e.date).format('DD-MM-YYYY');
            e.requestedDate = moment(e.requestedDate).format('DD-MM-YYYY');
            e.fromTime = e.fromTime ? moment(e.fromTime).format('hh:mm A') : '-';
            e.toTime = e.toTime ? moment(e.toTime).format('hh:mm A') : '-';
          })
        } else {
          this.utilService.errorToast(res.message);
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.errorToast(err.message);
      }
    });
  }

  openEditSideBar(data: ISessionDetails) {
    this.editSessionDetails = data;
    this.editSideBar = true;
    this.sessionEdit = true;
    this.statusFlag = data.approvalId == approveTypes.PENDING ? true : false;
  }

  cancelEditSideBar() {
    this.editSideBar = false;
  }

  editSession(data: ISessionDetails) {
    this.editId = data.id;
    console.log('this.editId', this.editId);
    data.date = moment(data.date).format('DD-MM-YYYY');
    console.log('data', data);
    this.sessionOpenFlag = true;
    this.editSideBar = false;
    this.sessionFrom.patchValue(data);
  }
  
  reject() {
    this.confirmPopup.reject();
  }

  confirm(event: Event, data: ISessionDetails) {
    this.removeId = data.id;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'You want to remove this ?',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Session removed Successfully', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have canceled', life: 3000 });
      }
    });
  }
  
  removeSession() {
    this.apiService.getById(sessionApiList.removeSession, this.removeId).subscribe({
      next: (res: any) => {
        console.log('res',res);
        if (res.status) {
          this.confirmPopup.accept();
          this.getSessionDetails();
        } else {
          this.utilService.errorToast(res.message);
        }
      }, error: (err: HttpErrorResponse) => {
        this.utilService.errorToast(err.message);
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
