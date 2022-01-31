import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { BoardColumn } from '@app/core/models/board-column';
import { TicketListItem } from '@app/core/models/ticket/ticket-list-item';
import { Observable } from 'rxjs';
import { ApiService } from '@app/core/api.service';
import { TicketBoardDataSource } from './ticket-board-data-source';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketBoardComponent implements OnInit {
  boardDataSource = new TicketBoardDataSource([]);
  board$: Observable<BoardColumn<TicketListItem>[]> = this.boardDataSource.data$;
  recordCount$: Observable<number> = this.boardDataSource.recordCount$;

  constructor(private apiService: ApiService){}

  public ngOnInit(): void {
    const board$ = this.apiService.getTicketBoard();
    this.boardDataSource.updateData(board$);
  }

  // public dropGrid(event: CdkDragDrop<TicketListItem[]>): void {
  //   moveItemInArray(this.boardColumns, event.previousIndex, event.currentIndex);
  // }

  public drop(event: CdkDragDrop<TicketListItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }

  ngOnDestroy() {
    this.boardDataSource.destroy();
  }
}
