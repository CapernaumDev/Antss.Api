import { SortChangeEvent } from "../interfaces/sort-change-event";
import { TicketListItem } from "../models/ticket/ticket-list-item";
import { DataSource } from "./data-source";

export class TicketListDataSource extends DataSource<TicketListItem> {
    sortLogic({ column, direction }: SortChangeEvent, data: any[]) {
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
}