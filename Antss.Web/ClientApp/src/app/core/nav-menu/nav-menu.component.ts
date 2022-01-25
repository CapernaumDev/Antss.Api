import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CurrentUser } from '@core/models/current-user';
import { AppStoreService } from "@core/app.store.service";
import { AuthenticationService } from '@core/authentication.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public currentUser$!: Observable<CurrentUser>;
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public userName: string = '';
  public faUserCircle = faUserCircle;

  private subscriptions: Subscription[] = [];

  isExpanded = false;

  constructor(private appStoreService: AppStoreService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    var currentUserSubscription = this.appStoreService.currentUser$
      .subscribe(x => {
        this.loggedIn = x.id > 0;
        this.isAdmin = x.isAdmin;
        this.userName = this.loggedIn ? `${x.firstName} ${x.lastName}` : '';
      });

    this.subscriptions.push(currentUserSubscription);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
