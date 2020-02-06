import { Injectable } from '@angular/core';
import {Recipe} from '../model/recipe';
import {Ingredient} from '../model/ingredient';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }
  URL = environment.serverURL;

  getAllUtil(search, start, limit) {
    return this.httpClient.get(this.URL + '/recipe', {params: {q: search, limit, start}}).pipe();
  }
}
