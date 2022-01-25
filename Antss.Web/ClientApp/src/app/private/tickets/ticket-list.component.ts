import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/api.service';
import { Observable } from 'rxjs';
import { Ticket } from '@core/models/ticket';

@Component({
  selector: 'ticket-list',
  templateUrl: './ticket-list.component.html',
})

export class TicketListComponent implements OnInit {

  TicketList!: Observable<Ticket[]>;
  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    this.getTicketList();
  }

  getTicketList() {
    this.TicketList = this.apiService.getTicketList();
  }
}
