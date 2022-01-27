import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppStoreService } from './app.store.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private appStoreService: AppStoreService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.appStoreService.currentUser$.pipe(
      switchMap(user => {

        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Basic ${user.apiToken}`
          }
        });

        return next.handle(newRequest);
      })
    );
  }
}
