import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBodegaRoutingModule } from './view-bodega-routing.module';
import { ViewBodegaComponent } from './view-bodega.component';
import { SidebarBodegaModule } from '../sidebar-bodega/sidebar-bodega.module';
import { MainBodegaModule } from '../main-bodega/main-bodega.module';

@NgModule({
  declarations: [
    ViewBodegaComponent
  ],
  imports: [
    CommonModule,
    ViewBodegaRoutingModule,
    SidebarBodegaModule,
    MainBodegaModule
  ]
})
export class ViewBodegaModule { }
