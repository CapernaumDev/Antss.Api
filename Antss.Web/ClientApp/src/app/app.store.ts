import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Office } from './models/office';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private offices = new BehaviorSubject<Office[]>([]);
  // We do not expose Subjects, because it's an anti-pattern, we only expose Observables
  public offices$: Observable<Office[]> = this.offices;

  // We change data via methods
  setOffices(value: Office[]): void {
    this.offices.next(value);
  }
}
