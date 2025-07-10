import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarVendorComponent } from './sidebar-vendor.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    
    SidebarVendorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarVendorComponent
  ],
})
export class SidebarVendorModule { }
