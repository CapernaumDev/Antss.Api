import { SetFilterEvent } from "../../core/interfaces/set-filter-event";
import { SortChangeEvent } from "../../core/interfaces/sort-change-event";
import { TicketListItem } from "../../core/models/ticket/ticket-list-item";
import { DataSource } from "../../core/data-source";
import { BoardColumn } from "@app/core/models/board-column";
import { Observable, Subject, Subscription } from "rxjs";

export class TicketBoardDataSource extends DataSource<BoardColumn<TicketListItem>> {
  private initialDataSnapshot!: BoardColumn<TicketListItem>[]
  private ticketCount = new Subject<number>();
  private subscriptions: Subscription[] = [];
  recordCount$ = this.ticketCount.asObservable();

  sortLogic({ column, direction }: SortChangeEvent, data: BoardColumn<TicketListItem>[]) {
    let sorted = data;
    if (direction === null) {
      return sorted;
    }
    switch (column) {
      // can provide custom sorting logic by column or fall through to default implementation
      default:
        return super.sort(data, column, direction);
    }
  }
  filterLogic({ filterTerm }: SetFilterEvent, data: BoardColumn<TicketListItem>[]) {
    let filterTermAsNumber = parseInt(filterTerm);
    let result: BoardColumn<TicketListItem>[] = [];

    if (isNaN(filterTermAsNumber)) {
      const term = filterTerm.toLowerCase();

      result = data.map(boardColumn => {
        boardColumn = Object.assign({}, boardColumn);
        boardColumn.data = boardColumn.data.filter(ticket => ticket.description.toLowerCase().includes(term))
        return boardColumn;
      });
    } else {
      result = data.map(boardColumn => {
        boardColumn = Object.assign({}, boardColumn);
        boardColumn.data = boardColumn.data.filter(ticket => ticket.id == filterTermAsNumber)
        return boardColumn;
      });
    }

    this.setTicketCount(result);
    return result;
  }
  destroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
    super.destroy();
  }
  moveTicket(ticketId: number, fromColumnId: string, toColumnId: string, toIndex: number) {//todo: make a type
    if (fromColumnId === toColumnId) return;
    
    let fromColumn = this.initialDataSnapshot.find(x => x.id == parseInt(fromColumnId));
    let toColumn = this.initialDataSnapshot.find(x => x.id == parseInt(toColumnId));

    if (!fromColumn || !toColumn) return;

    let ticketIndex = fromColumn.data.findIndex(x => x.id === ticketId);
    let ticket = fromColumn.data[ticketIndex];

    if (ticketIndex < 0) return;

    fromColumn.data.splice(ticketIndex, 1);
    toColumn.data.splice(toIndex, 0, ticket);

    super.patchInitialData(this.initialDataSnapshot);
  }
  protected onInitialDataUpdated(data: BoardColumn<TicketListItem>[]) {
    this.initialDataSnapshot = data;
  }
  protected onDataUpdated(data: BoardColumn<TicketListItem>[]) {
    this.setTicketCount(data);
  }
  private setTicketCount(data: BoardColumn<TicketListItem>[]) {
    let count = 0;

    data.forEach(x => {
      count += x.data.length;
    });

    this.ticketCount.next(count);
  }
}
