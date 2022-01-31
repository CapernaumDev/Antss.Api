import { SetFilterEvent } from "../../core/interfaces/set-filter-event";
import { SortChangeEvent } from "../../core/interfaces/sort-change-event";
import { TicketListItem } from "../../core/models/ticket/ticket-list-item";
import { DataSource } from "../../core/data-source";
import { BoardColumn } from "@app/core/models/board-column";

export class TicketBoardDataSource extends DataSource<BoardColumn<TicketListItem>> {
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

        if (isNaN(filterTermAsNumber)) {
          const term = filterTerm.toLowerCase();

        data.map(x => {
            x.data = x.data.filter(ticket => 
                 ticket.assignedTo?.toLowerCase().includes(term)
              || ticket.raisedBy.toLowerCase().includes(term)
              || ticket.ticketStatus.toLowerCase().includes(term)
              || ticket.description.toLowerCase().includes(term))
          });

          return data;
        } else {
          data.map(x => {
            x.data = x.data.filter(x => x.id === filterTermAsNumber);
          });

          return data;
        }
      }
}
