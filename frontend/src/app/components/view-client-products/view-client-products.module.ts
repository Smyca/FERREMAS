import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewClientProductsComponent } from './view-client-products.component';
import { FormsModule } from '@angular/forms';
import { ViewClientProductsRoutingModule } from './view-client-products-routing.module';
import { ProductoService } from '../../services/producto.service';



@NgModule({
  declarations: [ViewClientProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ViewClientProductsRoutingModule
  ],
  exports: [ViewClientProductsComponent],
  providers: [ProductoService]
})
export class ViewClientProductsModule { }
