import { Injectable } from '@angular/core';
import {Recipe} from "../model/recipe";
import {Ingredient} from "../model/ingredient";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getAllRecipe(): Recipe[] {
    let ingredient1 = <Ingredient>{
      'name': 'Aloo',
      'quantity': '10 Gm'
    };
    let ingredient2 = <Ingredient>{
      'name': 'Sabzi',
      'quantity': '20Kg'
    };
    let recipe = <Recipe>{
      '_id': 'asdfasdf',
      'title': 'Recipe #1',
      'description': 'Demo Recipe',
      'ingredients': [ingredient1, ingredient2],
      'instructions': ['do #1', 'Do #2'],
      'userId': '1234asdf'
    };
    let recipes = [{...recipe}, {...recipe}]
    return recipes;
  }

  getRecipe(search: ((regexp: (string | RegExp)) => number) | symbol | string | ((searcher: { [Symbol.search](string: string): number }) => number) | string[] | (() => void) | boolean) {
    return [];
  }
}
