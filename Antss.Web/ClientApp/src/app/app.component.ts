import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SignalRService } from './core/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'app';

  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTestDataListener();   
    this.startHttpRequest();
  }
  
  private startHttpRequest = () => {
    this.http.get('https://localhost:7210/api/hub')
      .subscribe(res => {
        console.log(res);
      })
  }
}
