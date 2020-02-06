import { Injectable } from '@angular/core';
import {LocalStorageService} from "../local-storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private localStorageService: LocalStorageService,
              private router: Router) { }

  login(username, password) {
    this.localStorageService.setAuthenticationToken("random");
    this.localStorageService.setUserName(username);
    return true;
  }

  logout() {
    this.localStorageService.removeUser();
    this.router.navigate(['login']);
  }
}
