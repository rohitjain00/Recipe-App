import { Injectable } from '@angular/core';
import {Recipe} from '../../model/recipe';
import {Ingredient} from '../../model/ingredient';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeFormService {

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService) { }
  URL = environment.serverURL;
  private getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authenticationToken: this.localStorageService.getAuthenticationToken()
      })
    };
  }
  sendRecipe(recipe: Recipe) {
    return this.httpClient.post(this.URL + '/recipe/', recipe, this.getHeader());
  }

  convertToRecipe(value: any) {
    const recipe = {
      title: value.title,
      description: value.description,
      ingredients: this.convertIngredients(value),
      instructions: this.convertInstructions(value),
    } as Recipe;
    return recipe;
  }

  convertIngredients(value: any) {
    const ingredients: Ingredient[] = [];

    for (const ingredient of value.ingredients) {
      ingredients.push({
        name : ingredient.name,
        quantity: ingredient.quantity
      } as Ingredient);
    }
    console.log(ingredients);
    return ingredients;
  }

  convertInstructions(value: any) {
    const instructions: string[] = [];

    for (const instruction of value.instructions) {
      console.log(instruction);
      instructions.push(instruction.instruction);
    }
    console.log(instructions);
    return instructions;
  }
}
