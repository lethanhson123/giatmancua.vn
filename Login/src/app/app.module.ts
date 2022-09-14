import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginLayoutComponent } from './Layouts/login-layout/login-layout.component';
import { DashBoardLayoutComponent } from './Layouts/dash-board-layout/dash-board-layout.component';
import { LoginComponent } from './UI/login/login.component';
import { MembershipComponent } from './UI/membership/membership.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    DashBoardLayoutComponent,
    LoginComponent,
    MembershipComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
