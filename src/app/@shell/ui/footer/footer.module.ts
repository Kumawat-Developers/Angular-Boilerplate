import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, ButtonModule],
  exports: [FooterComponent],
})
export class FooterModule {}
