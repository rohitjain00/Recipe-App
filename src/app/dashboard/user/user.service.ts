import { Injectable } from '@angular/core';
import {Recipe} from '../../model/recipe';
import {User} from '../../model/user';
import {Ingredient} from '../../model/ingredient';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService) { }
  URL: string = environment.serverURL;
  getRecipes() {
    return this.httpClient.get(this.URL + '/recipe/user', {
      headers : {
        'Content-Type':  'application/json',
        authenticationToken: this.localStorageService.getAuthenticationToken()
      }
    });
  }

  getUserDetailsWithId(userId) {
    return this.httpClient.get(this.URL + '/user/detail', {params: {userId}});
  }
}
