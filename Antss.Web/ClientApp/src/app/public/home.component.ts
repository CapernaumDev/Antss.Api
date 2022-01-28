import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppStoreService } from "@core/app.store.service";
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  constructor(public appStoreService: AppStoreService) { }

  ngOnInit() {
  }
}
