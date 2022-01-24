import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from './models/current-user';
import { KeyValuePair } from './models/key-value-pair';

import { Office } from './models/office';

@Injectable({
  providedIn: 'root',
})

export class AppStoreService {
  private offices = new BehaviorSubject<Office[]>([]);
  private userTypes = new BehaviorSubject<KeyValuePair[]>([]);
  
  private currentUser = new BehaviorSubject<CurrentUser>(new CurrentUser);

  // We do not expose Subjects, because it's an anti-pattern, we only expose Observables
  public offices$: Observable<Office[]> = this.offices;
  public userTypes$: Observable<KeyValuePair[]> = this.userTypes;
  public currentUser$: Observable<CurrentUser> = this.currentUser;

  // We change data via methods
  setOffices(value: Office[]): void {
    this.offices.next(value);
  }

  setUserTypes(value: KeyValuePair[]): void {
    this.userTypes.next(value);
  }

  setCurrentUser(value: CurrentUser): void {
    console.log('setting current user:' + value);
    this.currentUser.next(value);
  }
}
