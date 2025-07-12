import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoModule } from './components/producto/producto.module';
import { LoginModule } from './components/login/login.module';
import { ViewClientProductsComponent } from './components/view-client-products/view-client-products.component';
import { FormsModule } from '@angular/forms';
import { ViewClientProductsModule } from './components/view-client-products/view-client-products.module';
import { ClientPayComponent } from './components/client-pay/client-pay.component';
import { ClientPayModule } from './components/client-pay/client-pay.module';
import { SidebarBodegaComponent } from './components/sidebar-bodega/sidebar-bodega.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
 
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    FormsModule,
    ClientPayModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
