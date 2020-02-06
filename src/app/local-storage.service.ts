import { Inject, Injectable } from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';


let AUTH_KEY: string;
AUTH_KEY = 'user-auth';
let USER_KEY: string;
USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) { }

  public setAuthenticationToken(authenticationToken: String) {
    this.storageService.set(AUTH_KEY, authenticationToken);
  }
  public setUserName(username) {
    this.storageService.set(USER_KEY, username);
  }
  public getUserName() {
    return this.storageService.get(USER_KEY);
  }
  public isLoggedIn() {
    return this.storageService.has(AUTH_KEY);
  }
  public removeUser() {
    this.storageService.remove(AUTH_KEY);
    this.storageService.remove(USER_KEY);
  }
  public getAuthenticationToken() {
    return this.storageService.get(AUTH_KEY)
  }
}
