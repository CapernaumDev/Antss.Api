import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Office } from './models/office';

interface KeyValuePair {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private offices = new BehaviorSubject<Office[]>([]);
  private userTypes = new BehaviorSubject<KeyValuePair[]>([]);
  // We do not expose Subjects, because it's an anti-pattern, we only expose Observables
  public offices$: Observable<Office[]> = this.offices;
  public userTypes$: Observable<KeyValuePair[]> = this.userTypes;

  // We change data via methods
  setOffices(value: Office[]): void {
    this.offices.next(value);
  }

  setUserTypes(value: KeyValuePair[]): void {
    this.userTypes.next(value);
  }
}
