import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ValidationMessageComponent } from './validation-message/validation-message.component';



@NgModule({
  declarations: [
    ValidationMessageComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,

  ],
  exports:[ValidationMessageComponent]
})
export class ValidationMesssagesModule { }
