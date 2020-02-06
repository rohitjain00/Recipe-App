import { Injectable } from '@angular/core';
import {Recipe} from '../../model/recipe';
import {User} from '../../model/user';
import {Ingredient} from '../../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getRecipes(): Recipe[] {
    const ingredient1 = {
      name: 'Aloo',
      quantity: '10 Gm'
    } as Ingredient;
    const ingredient2 = {
      name: 'Sabzi',
      quantity: '20Kg'
    } as Ingredient;
    const recipe = {
      id: 'asdfasdf',
      title: 'Recipe #1',
      description: 'Demo Recipe',
      ingredients: [ingredient1, ingredient2],
      instructions: ['do #1', 'Do #2'],
      userId: '1234asdf'
    } as Recipe;
    const recipes = [{...recipe}, {...recipe}];
    return recipes;
  }

  getUserDetails(): User {
    return {
      username: 'Rohitjain00',
      name: 'Rohit'
    };
  }

  getUserDetailsWithId(userId): User {
    return {
      username: 'Rohitjain00',
      name: 'Rohit'
    };
  }
}
