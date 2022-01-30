import { SortChangeEvent } from "../interfaces/sort-change-event";
import { UserListItem } from "../models/user/user-list-item";
import { DataSource } from "./data-source";

export class UserListDataSource extends DataSource<UserListItem> {
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