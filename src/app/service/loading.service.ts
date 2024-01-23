import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  @Output() isLoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  showLoading() {
    this.isLoadingChanged.emit(true);
  }

  hideLoading() {
    this.isLoadingChanged.emit(false);
  }
}
