import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {
    path:'view-client-products', 
    loadChildren: () => import('./components/view-client-products/view-client-products.module').then(m => m.ViewClientProductsModule)
  },
  {
    path:'login',
    component: LoginComponent
  },
  { path: 'view-vendor', loadChildren: () => import('./components/view-vendor/view-vendor.module').then(m => m.ViewVendorModule) },
  { path: 'client-pay', loadChildren: () => import('./components/client-pay/client-pay.module').then(m => m.ClientPayModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
