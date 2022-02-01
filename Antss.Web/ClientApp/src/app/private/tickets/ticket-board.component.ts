import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardColumn } from '@app/core/models/board-column';
import { TicketListItem } from '@app/core/models/ticket/ticket-list-item';
import { catchError, Observable, take } from 'rxjs';
import { ApiService } from '@app/core/api.service';
import { TicketBoardDataSource } from './ticket-board-data-source';
import { FilterSourceDirective } from '@app/core/directives/filter-source.directive';
import { FilterInputComponent } from '@app/core/components/filter-input.component';
import { UpdateTicketStatus } from '@app/core/models/ticket/update-ticket-status';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketBoardComponent implements OnInit {
  boardDataSource = new TicketBoardDataSource([]);
  board$: Observable<BoardColumn<TicketListItem>[]> = this.boardDataSource.data$;
  recordCount$: Observable<number> = this.boardDataSource.recordCount$;

  @ViewChild(FilterSourceDirective) filterSource!: FilterSourceDirective;
  @ViewChild('filterElement') filterElement!: FilterInputComponent;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef){}

  public ngOnInit(): void {
    const board$ = this.apiService.getTicketBoard();
    this.boardDataSource.updateData(board$);
  }

  public drop(event: CdkDragDrop<TicketListItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let ticketStatusId = parseInt(event.container.id);
      let ticketId = event.previousContainer.data[event.previousIndex].id;

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.apiService.updateTicketStatus(new UpdateTicketStatus(ticketId, ticketStatusId))
        .pipe(
          take(1),
          catchError(err => {
            alert('There was a problem updating the ticket status');
            transferArrayItem(event.container.data,
              event.previousContainer.data,
              event.currentIndex,
              event.previousIndex);
            
            this.cdr.markForCheck(); //onPush strategy needs a nudge here
            throw err;
          }))
          .subscribe();
    }
  }

  ngAfterViewInit() {
    this.boardDataSource.filterSource = this.filterSource;
  }

  ngOnDestroy() {
    this.boardDataSource.destroy();
  }
}
