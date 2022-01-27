import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from './models/user/current-user';
import { OptionItem } from './models/option-item';

@Injectable({
  providedIn: 'root',
})

export class AppStoreService {
  private offices = new BehaviorSubject<OptionItem[]>([]);
  private userTypes = new BehaviorSubject<OptionItem[]>([]);
  
  private currentUser = new BehaviorSubject<CurrentUser>(new CurrentUser);
  private redirectAfterLogin = new BehaviorSubject<string>('');

  // We do not expose Subjects, because it's an anti-pattern, we only expose Observables
  public offices$: Observable<OptionItem[]> = this.offices;
  public userTypes$: Observable<OptionItem[]> = this.userTypes;
  public currentUser$: Observable<CurrentUser> = this.currentUser;
  public redirectAfterLogin$: Observable<string> = this.redirectAfterLogin;

  // We change data via methods
  setOffices(value: OptionItem[]): void {
    this.offices.next(value);
  }

  setUserTypes(value: OptionItem[]): void {
    this.userTypes.next(value);
  }

  setCurrentUser(value: CurrentUser): void {
    this.currentUser.next(value);
  }

  setRedirectAfterLogin(value: string): void {
    this.redirectAfterLogin.next(value);
  }
}
