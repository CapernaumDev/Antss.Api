import { Component, OnInit } from '@angular/core';
import { AppStoreService } from "@core/app.store.service";
import { Subscription } from 'rxjs';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(500, style({opacity: 1}))
      ]) 
    ])
  ]
})
export class HomeComponent implements OnInit {
  public isSigningIn!: boolean;
  public currentUserId!: number;
  public currentUserFirstName!: string;

  private subscriptions: Subscription[] = [];

  constructor(private appStoreService: AppStoreService) { }

  ngOnInit() {
    var isSigningInSubscription = this.appStoreService.isSigningIn$
      .subscribe(x => {
        this.isSigningIn = x;
      });

    var currentUserSubscription = this.appStoreService.currentUser$
      .subscribe(x => {
        this.currentUserId = x.id;
        this.currentUserFirstName = x.firstName
      });
    
    this.subscriptions.push(isSigningInSubscription);
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
