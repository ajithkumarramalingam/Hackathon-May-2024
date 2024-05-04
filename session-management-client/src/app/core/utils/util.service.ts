import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private messageService: MessageService
  ) { }

  successToast(msg: string) {
    this.messageService.add
      ({
        severity: 'success',
        summary: 'Success',
        detail: msg,
        closable: false
      });
  }

  errorToast(msg: string) {
    this.messageService.add
      ({
        severity: 'error',
        summary: 'Error',
        detail: msg,
        closable: false
      });
  }
}
