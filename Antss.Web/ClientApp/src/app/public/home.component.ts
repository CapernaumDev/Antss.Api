import { Component, OnInit } from '@angular/core';
import { AppStoreService } from "@core/app.store.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public welcomeMessage!: string;

  private subscriptions: Subscription[] = [];

  constructor(private appStoreService: AppStoreService) { }

  ngOnInit() {
    var currentUserSubscription = this.appStoreService.currentUser$
      .subscribe(x => {
        x.id > 0 ? this.welcomeMessage = `Welcome, ${x.firstName}` : this.welcomeMessage = 'Welcome to ANTSS';
      });
      
    this.subscriptions.push(currentUserSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
