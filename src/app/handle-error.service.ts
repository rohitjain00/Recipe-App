import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from './alert.service';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {
constructor(private alertService: AlertService) { }
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.alertService.flashErrorMessage(error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.alertService.flashErrorMessage(error.error.message);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
