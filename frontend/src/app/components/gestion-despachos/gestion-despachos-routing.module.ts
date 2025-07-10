import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDespachosComponent } from './gestion-despachos.component';

const routes: Routes = [{ path: '', component: GestionDespachosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDespachosRoutingModule { }
