import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBodegaComponent } from './main-bodega.component';


const routes: Routes = [
  {
    path: '',
    component: MainBodegaComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MainBodegaComponent }, // Vista por defecto
      { path: 'bod-pedidos', loadChildren: () => import('../bod-pedidos/bod-pedidos.module').then(m => m.BodPedidosModule) },
      { path: 'bod-despachos', loadChildren: () => import('../bod-despachos/bod-despachos.module').then(m => m.BodDespachosModule) }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainBodegaRoutingModule { }
