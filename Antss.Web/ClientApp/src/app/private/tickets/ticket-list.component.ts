import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '@core/api.service';
import { Observable } from 'rxjs';
import { TicketListItem } from '@core/models/ticket/ticket-list-item';

@Component({
  selector: 'ticket-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ticket-list.component.html',
})

export class TicketListComponent implements OnInit {

  TicketList!: Observable<TicketListItem[]>;
  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    this.getTicketList();
  }

  getTicketList() {
    this.TicketList = this.apiService.getTicketList();
  }
}
