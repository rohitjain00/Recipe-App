import { Injectable } from '@angular/core';
import {Recipe} from "../../model/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }
  getRecipeWithId(recipeId): Recipe {
    return null;
  }
}
