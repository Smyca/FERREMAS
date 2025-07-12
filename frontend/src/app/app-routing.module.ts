import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'view-vendor', loadChildren: () => import('./components/view-vendor/view-vendor.module').then(m => m.ViewVendorModule) },
  { path: 'client-pay', loadChildren: () => import('./components/client-pay/client-pay.module').then(m => m.ClientPayModule) },
  { path: 'view-bodega', loadChildren: () => import('./components/view-bodega/view-bodega.module').then(m => m.ViewBodegaModule) },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
  {
    path: '', 
    loadChildren: () => import('./components/view-client-products/view-client-products.module').then(m => m.ViewClientProductsModule)
  },
  { path: '**', redirectTo: '' } // Wildcard route debe ir al final
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
