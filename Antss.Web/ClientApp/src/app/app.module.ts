import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './admin/user-list.component';
import { CreateUserComponent } from './admin/create-user.component';
import { TicketListComponent } from './tickets/ticket-list.component';
import { AppStartup } from './app.startup';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    UserListComponent,
    CreateUserComponent,
    TicketListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'user-list', component: UserListComponent },
      { path: 'create-user', component: CreateUserComponent },
      { path: 'ticket-list', component: TicketListComponent }
    ])
  ],
  providers: [
    { provide: APP_INITIALIZER, multi: true, deps: [AppStartup], useFactory: (startupClass: AppStartup) => () => startupClass.getStartupData() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
