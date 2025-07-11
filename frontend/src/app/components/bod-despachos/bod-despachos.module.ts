import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodDespachosComponent } from './bod-despachos.component';
import { BodDespachosRoutingModule } from './bod-despachos-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BodDespachosComponent],
  imports: [
    CommonModule,
    FormsModule,
    BodDespachosRoutingModule
    
  ]
})
export class BodDespachosModule { }
