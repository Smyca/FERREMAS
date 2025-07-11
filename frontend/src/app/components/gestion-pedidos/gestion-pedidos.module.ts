import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionPedidosRoutingModule } from './gestion-pedidos-routing.module';
import { GestionPedidosComponent } from './gestion-pedidos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GestionPedidosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GestionPedidosRoutingModule
  ]
})
export class GestionPedidosModule { }
