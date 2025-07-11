import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewClientProductsComponent } from './view-client-products.component';

const routes: Routes = [
  {
    path: '',
    component: ViewClientProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewClientProductsRoutingModule { }