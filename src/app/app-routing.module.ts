import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AdminComponent} from './pages/admin/admin.component';
import {SettingComponent} from './pages/admin/setting/setting.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  // {path: 'admin', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, children: [
      {path: 'setting', component: SettingComponent},
    ]}
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  // { path: 'settings', component: SettingComponent },
  // { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, NgZorroAntdModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
