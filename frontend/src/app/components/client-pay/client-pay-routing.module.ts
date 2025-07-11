import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPayComponent } from './client-pay.component';

const routes: Routes = [{ path: '', component: ClientPayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPayRoutingModule { }
