import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodPedidosComponent } from './bod-pedidos.component';


const routes: Routes = [{ path: '', component: BodPedidosComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodPedidosRoutingModule { }  