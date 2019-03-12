import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';
import {AuthenticationService} from '@app/core';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('jwtToken')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + localStorage.getItem('jwtToken')
        }
      });
    }

    /**
     * continues request execution
     */
    return next.handle(request).pipe(catchError((error, caught) => {
      console.log(error);
      this.handleAuthError(error);
      return of(error);
    }) as any);
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      console.log('handled error ' + err.status);
      this.auth.logout();
      this.router.navigate([`/login`]);
      return of(err.message);
    }
    throw err;
  }
}
