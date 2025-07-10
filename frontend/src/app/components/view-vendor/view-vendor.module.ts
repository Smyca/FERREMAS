import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewVendorRoutingModule } from './view-vendor-routing.module';
import { ViewVendorComponent } from './view-vendor.component';
import { SidebarVendorModule } from '../sidebar-vendor/sidebar-vendor.module';
import { MainVendorModule } from '../main-vendor/main-vendor.module';


@NgModule({
  declarations: [
    ViewVendorComponent
  ],
  imports: [
    CommonModule,
    ViewVendorRoutingModule,
    SidebarVendorModule,
    MainVendorModule
  ]
})
export class ViewVendorModule { }
