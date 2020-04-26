import { Injectable } from '@angular/core';
import {Recipe} from '../../model/recipe';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient: HttpClient) { }
  URL: string = environment.serverURL;
  getRecipeWithId(recipeId) {
      return this.httpClient.get(this.URL + '/recipe/id/' + recipeId);
  }
}
