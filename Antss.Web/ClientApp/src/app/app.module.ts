import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { AuthenticationInterceptor } from '@app/authentication.interceptor';
import { ErrorInterceptor } from '@app/error.interceptor';
import { AppComponent } from './app.component';
import { AuthGuard } from './login/auth.guard';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './admin/user-list.component';
import { CreateUserComponent } from './admin/create-user.component';
import { TicketListComponent } from './tickets/ticket-list.component';
import { AppStartup } from './app.startup';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    UserListComponent,
    CreateUserComponent,
    TicketListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard], data: { role: ['Admin'] }  },
      { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard], data: { role: ['Admin'] }  },
      { path: 'ticket-list', component: TicketListComponent, canActivate: [AuthGuard], }
    ])
  ],
  providers: [
    { provide: APP_INITIALIZER, multi: true, deps: [AppStartup], useFactory: (startupClass: AppStartup) => () => startupClass.getStartupData() },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faUserCircle);
  }
}
