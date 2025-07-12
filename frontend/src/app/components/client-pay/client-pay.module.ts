import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPayRoutingModule } from './client-pay-routing.module';
import { ClientPayComponent } from './client-pay.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [
    ClientPayComponent
  ],
  imports: [
    CommonModule,
    ClientPayRoutingModule,
    FormsModule,
    NavbarModule
  ],
  exports: [
    ClientPayComponent
  ]
})
export class ClientPayModule { }
