import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainBodegaRoutingModule } from './main-bodega-routing.module';
import { MainBodegaComponent } from './main-bodega.component';
import { RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [
    MainBodegaComponent
  ],
  imports: [
    CommonModule,
    MainBodegaRoutingModule,
    RouterOutlet
  ],
  exports: [MainBodegaComponent]
})
export class MainBodegaModule { }
