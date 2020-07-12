import { NgModule } from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AdminComponent} from './pages/admin/admin.component';
import {SettingComponent} from './pages/admin/setting/setting.component';
import {RegisterComponent} from './pages/register/register.component';
import {AuthGuardGuard} from './auth-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'admin', redirectTo: '/admin/setting', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivateChild: [AuthGuardGuard], children: [
      {path: 'setting', component: SettingComponent},
    ]}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, NgZorroAntdModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
