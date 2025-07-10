import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionDespachosRoutingModule } from './gestion-despachos-routing.module';
import { GestionDespachosComponent } from './gestion-despachos.component';


@NgModule({
  declarations: [
    GestionDespachosComponent
  ],
  imports: [
    CommonModule,
    GestionDespachosRoutingModule
  ]
})
export class GestionDespachosModule { }
