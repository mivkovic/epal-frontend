import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'header-component',
  templateUrl: './header.html'
})
export class HeaderComponent {
  constructor(
    private _modalService: ModalService
  ) {}

  public openAuthModal() {
    this._modalService.open(
      AuthComponent
    )
  }
}
