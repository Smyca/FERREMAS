import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPayRoutingModule } from './client-pay-routing.module';
import { ClientPayComponent } from './client-pay.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientPayComponent
  ],
  imports: [
    CommonModule,
    ClientPayRoutingModule,
    FormsModule
  ],
  exports: [
    ClientPayComponent
  ]
})
export class ClientPayModule { }
