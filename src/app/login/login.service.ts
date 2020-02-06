import { Injectable } from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {HandleErrorService} from '../handle-error.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  URL: string = environment.serverURL;
  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private httpClient: HttpClient,
              private handleErrorService: HandleErrorService) { }

  loginUtil(user) {
    return this.httpClient.post(this.URL + '/user/login', user ).pipe(
      retry(3),
      catchError(this.handleErrorService.handleError)
    );
  }

  logout() {
    this.localStorageService.removeUser();
    this.router.navigate(['login']);
  }
}
