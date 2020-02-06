import {Ingredient} from './ingredient';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  userId: string;
}
