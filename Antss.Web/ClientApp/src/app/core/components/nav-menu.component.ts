import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppStoreService } from "@core/app.store.service";
import { AuthenticationService } from '@core/authentication.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public faUserCircle = faUserCircle;

  isExpanded = false;

  constructor(public appStoreService: AppStoreService, private authenticationService: AuthenticationService) { }

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
