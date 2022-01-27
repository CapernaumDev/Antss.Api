import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationInterceptor } from '@core/authentication.interceptor';
import { ErrorInterceptor } from '@core/error.interceptor';
import { AppComponent } from './app.component';
import { AppStartup } from './core/app.startup';
import { CoreModule } from './core/core.module';
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule,
    HttpClientModule,
    CoreModule,
    PublicModule,
    PrivateModule
  ],
  providers: [
    { provide: APP_INITIALIZER, multi: true, deps: [AppStartup], useFactory: (startupClass: AppStartup) => () => startupClass.loginWithAccessToken() },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
}
