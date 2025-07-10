import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainVendorRoutingModule } from './main-vendor-routing.module';
import { MainVendorComponent } from './main-vendor.component';
import { RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [
    MainVendorComponent
  ],
  imports: [
    CommonModule,
    MainVendorRoutingModule,
    RouterOutlet
  ],
  exports: [
    MainVendorComponent
  ],
})
export class MainVendorModule { }
