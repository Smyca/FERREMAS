import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewVendorComponent } from './view-vendor.component';

const routes: Routes = [
  {
    path: '',
    component: ViewVendorComponent,
    children: [
      { path: '', redirectTo: 'main-vendor', pathMatch: 'full' },
      { path: 'main-vendor', loadChildren: () => import('../main-vendor/main-vendor.module').then(m => m.MainVendorModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewVendorRoutingModule { }
