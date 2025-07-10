import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module'

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        LoginRoutingModule
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule { }
