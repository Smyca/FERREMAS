import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarBodegaComponent } from './sidebar-bodega.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SidebarBodegaComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SidebarBodegaComponent]
})
export class SidebarBodegaModule { }
