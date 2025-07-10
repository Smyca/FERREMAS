import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainVendorComponent } from './main-vendor.component';

const routes: Routes = [
  {
    path: '',
    component: MainVendorComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MainVendorComponent }, // Vista por defecto
      { path: 'gestion-pedidos', loadChildren: () => import('../gestion-pedidos/gestion-pedidos.module').then(m => m.GestionPedidosModule) },
      { path: 'gestion-despachos', loadChildren: () => import('../gestion-despachos/gestion-despachos.module').then(m => m.GestionDespachosModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainVendorRoutingModule { }
