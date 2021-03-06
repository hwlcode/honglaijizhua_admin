import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {AdminComponent} from './pages/admin/admin.component';
import {SettingComponent} from './pages/admin/setting/setting.component';
import {RegisterComponent} from './pages/register/register.component';
import {AuthInterceptor} from './http-interceptors/auth-interceptor';
import {AuthServiceService} from './auth-service.service';
import {AuthGuardGuard} from './auth-guard.guard';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SettingComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,  // 模板式表单
    ReactiveFormsModule, // 响应式表单
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthServiceService,
    {provide: NZ_I18N, useValue: zh_CN},
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    },
    AuthGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
