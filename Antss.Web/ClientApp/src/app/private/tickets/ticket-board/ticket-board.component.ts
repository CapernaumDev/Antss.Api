import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { BoardColumn } from '@app/core/models/board-column';
import { TicketListItem } from '@app/core/models/ticket/ticket-list-item';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketBoardComponent implements OnInit {

  public boardColumns: BoardColumn<TicketListItem>[] = [
    new BoardColumn<TicketListItem>('In Progress', 21, [
      { description: 'test 1', id: 1, raisedBy: 'saddas', ticketStatus: 'In progress', assignedTo: 'dsaas' },
      { description: 'test 2', id: 1, raisedBy: 'asd  asdasd', ticketStatus: 'In progress', assignedTo: 'dsaas' }
    ]),
    new BoardColumn('Completed', 32, [
      { description: 'test 3', id: 1, raisedBy: 'saddas', ticketStatus: 'In progress', assignedTo: 'dsaas' },
      { description: 'test 4', id: 1, raisedBy: 'asd  asdasd', ticketStatus: 'In progress', assignedTo: 'dsaas' }
    ])
  ]

  constructor(){}

  public ngOnInit(): void {
    console.log(this.boardColumns);
  }

  public dropGrid(event: CdkDragDrop<TicketListItem[]>): void {
    moveItemInArray(this.boardColumns, event.previousIndex, event.currentIndex);
  }

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
}
