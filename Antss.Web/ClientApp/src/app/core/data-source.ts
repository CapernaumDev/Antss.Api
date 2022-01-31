import { catchError, isObservable, map, Observable, of, Subject, Subscription, tap, withLatestFrom } from "rxjs";
import { FilterSourceDirective } from "./directives/filter-source.directive";
import { SortableDirective } from "./directives/sortable.directive";
import { SetFilterEvent } from "./interfaces/set-filter-event";
import { SortChangeEvent, SortDirection } from "./interfaces/sort-change-event";

export abstract class DataSource<T> {
  private subscriptions: Subscription[] = [];

  private inititalDataSubject = new Subject<T[]>();
  initialData$ = this.inititalDataSubject.asObservable();

  private dataSubject = new Subject<T[]>();
  data$ = this.dataSubject.asObservable();

  private recordCount = new Subject<number>();
  recordCount$ = this.recordCount.asObservable();

  private lastSortEvent?: SortChangeEvent;
  private lastFilterEvent?: SetFilterEvent;

  constructor(data: T[] = []) {
    this.updateData(data);
  }

  set sorter(sorter: SortableDirective) {
    this.listenToSortChanges(sorter);
  }

  set filterSource(filterSource: FilterSourceDirective) {
    this.listenToFilterChanges(filterSource);
  }

  destroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  updateData(data: T[] | Observable<T[]>) {
    if (isObservable(data)) {
      const sub = data
        .pipe(
          tap((res) => {
            this.setData(res);
          })
        )
        .subscribe();
      this.subscriptions.push(sub);
    } else {
      this.setData(data);
    }
  }

  sort(data: any[], column: string, direction: SortDirection) {
    let sorted = [...data].sort((a, b) => {
      const order = direction === "asc" ? 1 : -1;

      if (!a[column] && !b[column]) {
        return 0;
      }

      if (!a[column]) {
        return +1;
      }

      if (!b[column]) {
        return -1;
      }

      if (typeof(a[column]) === 'number') {
        return order * (a[column] - b[column]);
      } else {
        return order * a[column].localeCompare(b[column], undefined, { sensitivity: 'base' });
      }

    });

    return sorted;
  }

  abstract sortLogic(sorter: SortChangeEvent, data: T[]): T[];
  abstract filterLogic(setFilterEvent: SetFilterEvent, data: T[]): T[];

  private listenToSortChanges(sorter: SortableDirective) {
    const sub = sorter.sortChange
      .pipe(
        withLatestFrom(this.initialData$),
        tap(([sortEvent]) => this.lastSortEvent = sortEvent),
        map(([sortEvent, data]) => this.sortLogic(sortEvent, data)),
        catchError(() => of([]))
      )
      .subscribe((data) => { 
        if (this.lastFilterEvent && this.lastFilterEvent.filterTerm) {
          data = this.filterLogic(this.lastFilterEvent, data);
        }

        this.dataSubject.next(data);
        this.recordCount.next(data.length);
      });

    this.subscriptions.push(sub);
  }

  private listenToFilterChanges(filterSource: FilterSourceDirective) {
    const sub = filterSource.filterChange
      .pipe(
        withLatestFrom(this.initialData$),
        tap(([setFilterEvent]) => this.lastFilterEvent = setFilterEvent),
        map(([setFilterEvent, data]) => this.filterLogic(setFilterEvent, data)),
        catchError(() => of([]))
      )
      .subscribe((data) => { 
        if (this.lastSortEvent) {
          data = this.sortLogic(this.lastSortEvent, data);
        }

        this.dataSubject.next(data);
        this.recordCount.next(data.length);
      });

    this.subscriptions.push(sub);
  }

  private setData(data: T[]) {
    this.dataSubject.next(data);
    this.inititalDataSubject.next(data);
    this.recordCount.next(data.length);
  }
}