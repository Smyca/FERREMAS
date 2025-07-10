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
  { path: 'view-vendor', loadChildren: () => import('./components/view-vendor/view-vendor.module').then(m => m.ViewVendorModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
