import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {HandleErrorService} from '../handle-error.service';
import {LocalStorageService} from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient,
              private handleErrorService: HandleErrorService,
              private localStorageService: LocalStorageService) { }
  URL = environment.serverURL;

  registerUtil(user) {
    return this.httpClient.post(this.URL + '/user/register', user ).pipe(
      retry(3),
      catchError(this.handleErrorService.handleError)
    );
  }
}
