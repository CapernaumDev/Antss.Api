import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppStoreService } from "@core/app.store.service";
import { AuthenticationService } from '@core/authentication.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/user/current-user';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-nav-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public currentUser$: Observable<CurrentUser | null>;
  public faUserCircle = faUserCircle;

  isExpanded = false;

  constructor(public appStoreService: AppStoreService, private authenticationService: AuthenticationService, private store: Store<AppState>) {
    this.currentUser$ = this.store.select(x => x.authentication.currentUser);
  }

  ngOnInit(): void {
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
}
