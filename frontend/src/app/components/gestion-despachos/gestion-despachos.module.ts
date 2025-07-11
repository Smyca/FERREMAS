import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionDespachosRoutingModule } from './gestion-despachos-routing.module';
import { GestionDespachosComponent } from './gestion-despachos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GestionDespachosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GestionDespachosRoutingModule
  ]
})
export class GestionDespachosModule { }
