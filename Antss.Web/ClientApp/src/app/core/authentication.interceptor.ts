import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(x => x.authentication.currentUser).pipe(
      switchMap(user => {

        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Basic ${user?.accessToken}`
          }
        });

        return next.handle(newRequest);
      })      
    )
  }
}
