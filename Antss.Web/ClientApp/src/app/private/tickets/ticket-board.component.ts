import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import { Store } from '@ngrx/store';

import { BoardColumn } from '@app/core/models/board-column';
import { TicketListItem } from '@app/core/models/ticket/ticket-list-item';
import { catchError, Observable, take } from 'rxjs';
import { ApiService } from '@app/core/api.service';
import { TicketBoardDataSource } from './ticket-board-data-source';
import { FilterSourceDirective } from '@app/core/directives/filter-source.directive';
import { FilterInputComponent } from '@app/core/components/filter-input.component';
import { UpdateTicketStatus } from '@app/core/models/ticket/update-ticket-status';
import { AppState } from '@app/core/store/app.state';
import { loadTicketBoardRequested } from '@app/core/store/actions';
import { selectTicketBoard } from '@app/core/store/selectors';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('confirmationHighlight', [
      transition('*=>isConfirmed', animate('600ms', keyframes([
        style({backgroundColor: 'initial', boxShadow: 'none', offset: 0} ),
        style({backgroundColor: '#5cff4c', boxShadow: '0 0 5px #5cff4c', offset: 0.01} ),
        style({backgroundColor: 'initial', boxShadow: 'none', offset: 1} ),
      ])))
    ])
  ]
})

export class TicketBoardComponent {
  boardDataSource = new TicketBoardDataSource([]);
  board$: Observable<BoardColumn<TicketListItem>[]> = this.boardDataSource.data$;
  recordCount$: Observable<number> = this.boardDataSource.recordCount$;
  showConfirmationFor!: TicketListItem | null;

  @ViewChild(FilterSourceDirective) filterSource!: FilterSourceDirective;
  @ViewChild('filterElement') filterElement!: FilterInputComponent;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private store: Store<AppState>){
    this.store.dispatch(loadTicketBoardRequested({ includeClosed: false })); 
    this.boardDataSource.setDataSource(this.store.select(selectTicketBoard));  
  }

  public drop(event: CdkDragDrop<TicketListItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let ticketStatusId = parseInt(event.container.id);
      let ticket = event.previousContainer.data[event.previousIndex];

      this.apiService.updateTicketStatus(new UpdateTicketStatus(ticket.id, ticketStatusId, event.currentIndex))
        .pipe(
          take(1),
          catchError(err => {
            alert('There was a problem updating the ticket status');
            throw err;
          }))
          .subscribe(() => {
            //TODO: need to show confirmation when ticket status update is received from server push
            // this.showConfirmationFor = ticket;
            // this.cdr.detectChanges(); //onPush strategy needs a shove here
          });
    }
  }

  reload(event: Event) {
    let target = event.target as HTMLInputElement;
    this.store.dispatch(loadTicketBoardRequested({ includeClosed: target.checked }))
  }

  ngAfterViewInit() {
    this.boardDataSource.filterSource = this.filterSource;
  }

  ngOnDestroy() {
    this.boardDataSource.destroy();
  }
}
