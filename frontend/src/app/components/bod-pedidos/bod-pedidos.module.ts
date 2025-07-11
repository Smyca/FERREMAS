import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodPedidosComponent } from './bod-pedidos.component';
import { BodPedidosRoutingModule } from './bod-pedidos-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BodPedidosComponent],
  imports: [
    CommonModule,
    FormsModule,
    BodPedidosRoutingModule
  ]
})
export class BodPedidosModule { }
