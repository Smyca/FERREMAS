import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBodegaComponent } from './view-bodega.component';

const routes: Routes = [
  { 
    path: '', 
    component: ViewBodegaComponent,
    children: [
      { path: '', redirectTo: 'main-bodega', pathMatch: 'full' },
      { path: 'main-bodega', loadChildren: () => import('../main-bodega/main-bodega.module').then(m => m.MainBodegaModule) }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewBodegaRoutingModule { }
