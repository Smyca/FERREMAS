import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

import { ProductoComponent } from './producto.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoService } from '../../services/producto.service';

@NgModule({
  declarations: [
    ProductoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    ProductoRoutingModule
  ],
  providers: [
    ProductoService
  ],
  exports: [
    ProductoComponent
  ]
})
export class ProductoModule { }
