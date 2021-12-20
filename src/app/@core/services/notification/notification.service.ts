import { Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable()
export class NotificationService {
  constructor(private toastr: MessageService) { }

  public success = (body: string): void => {
    this.toastr.add({
      severity: "success",
      summary: "Success",
      detail: body,
    });
  }

  public error = (body: string): void => {
    this.toastr.add({
      severity: "error",
      summary: "Error",
      detail: body,
    });
  }
}
