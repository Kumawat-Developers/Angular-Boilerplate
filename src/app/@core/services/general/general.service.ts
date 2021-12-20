import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../notification/notification.service';
import { RouterService } from '../router/router.service';
@Injectable()
export class GeneralService {
  constructor(
    private router: RouterService,
    private notification: NotificationService,
    private spinner: NgxSpinnerService,
  ) {}

  public navigate(url): void {
    this.router.navigate(url);
  }
  public success(body: any): void {
    this.notification.success(body);
  }
  public error(body: any): void {
    this.notification.error(body);
  }
  public show(): void {
    this.spinner.show();
  }
  public hide(): void {
    this.spinner.hide();
  }
  public restError(error: any): void {
    this.hide();
    this.e(error);
    this.e(error.error.message);
    this.error(error.error.message);

  }
  public l(log: any): void {
    console.log(log);
  }
  public e(log: any): void {
    console.error(log);
  }
}
