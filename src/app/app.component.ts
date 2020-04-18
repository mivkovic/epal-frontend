import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnDestroy
} from '@angular/core';
import { LocalizationService } from './shared/services/localization.service';
import { ModalService } from './shared/services/modal.service';
import { Subscription } from 'rxjs';
import each from 'lodash/each';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy{
  @ViewChild('modal', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
  public componentRef: any;
  private _subscriptions: Subscription[] = [];

  constructor(
    private localizationService: LocalizationService,
    private modalService: ModalService,
    private resolver: ComponentFactoryResolver
  ) {
    this._subcribeToOpenModal();
    this._subcribeToCloseModal();
    this.localizationService.setInitTranslations();
  }

  private _subcribeToOpenModal() {
    this._subscriptions.push(
      this.modalService.openModal$.subscribe(component => {
        if (this.componentRef) {
          return;
        }
        this._createModal(component);
      })
    );
  }

  private _subcribeToCloseModal() {
    this._subscriptions.push(
      this.modalService.closeModal$.subscribe(() => {
        this._destoryModal();
      })
    );
  }

  private _createModal(component) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.entry.createComponent(factory);
  }

  private _destoryModal() {
    this.componentRef.destroy();
    this.componentRef = null;
  }

  ngOnDestroy() {
    each(this._subscriptions, s => s.unsubscribe());
  }
}
