import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SvgIconDirective } from './directives/svg-icon.directive';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SvgIconDirective
  ],
  exports: [
    SvgIconDirective
  ]
})
export class SharedModule { } 