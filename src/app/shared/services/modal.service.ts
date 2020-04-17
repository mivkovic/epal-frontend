import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  public openModal = new Subject<any>();
  public closeModal = new Subject<any>();
  public openModal$ = this.openModal.asObservable();
  public closeModal$ = this.closeModal.asObservable();

  public open(data) {
    this.openModal.next(data);
  }

  public close() {
    this.closeModal.next();
  }
}