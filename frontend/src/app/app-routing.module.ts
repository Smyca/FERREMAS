import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {
    path:'productos', 
    loadChildren: () => import('./components/producto/producto.module').then(m => m.ProductoModule)
  },
  {
    path:'login',
    component: LoginComponent
  },
  { path: 'gestion-pedidos', loadChildren: () => import('./components/gestion-pedidos/gestion-pedidos.module').then(m => m.GestionPedidosModule) },
  { path: 'gestion-despachos', loadChildren: () => import('./components/gestion-despachos/gestion-despachos.module').then(m => m.GestionDespachosModule) },
  { path: 'main', loadChildren: () => import('./components/main/main.module').then(m => m.MainModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
