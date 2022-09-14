import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardLayoutComponent } from './Layouts/dash-board-layout/dash-board-layout.component';
import { LoginLayoutComponent } from './Layouts/login-layout/login-layout.component';
import { LoginComponent } from './UI/login/login.component';
import { MembershipComponent } from './UI/membership/membership.component';

const routes: Routes = [
  // { path: '', redirectTo: '/Membership', pathMatch: 'full' },
  // {
  //   path: 'Membership', component: DashBoardLayoutComponent,
  //   children: [{ path: '', component: MembershipComponent }]
  // },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
