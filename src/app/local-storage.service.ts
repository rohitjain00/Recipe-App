import { Inject, Injectable } from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';


let STORAGE_KEY: string;
STORAGE_KEY = 'user-auth';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) { }

  public setAuthenticationToken(authenticationToken: String) {
    this.storageService.set(STORAGE_KEY, authenticationToken);
  }
  public isLoggedIn() {
    return this.storageService.has(STORAGE_KEY);
  }
  public removeUser() {
    this.storageService.remove(STORAGE_KEY);
  }
  public getAuthenticationToken() {
    return this.storageService.get(STORAGE_KEY)
  }
}
