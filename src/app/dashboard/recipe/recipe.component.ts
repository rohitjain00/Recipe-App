import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../model/recipe";
import {RecipeService} from "./recipe.service";
import {User} from "../../model/user";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe_id: string;
  recipe: Recipe;
  user: User;
  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private userService: UserService) {
      this.activatedRoute.params.subscribe( params => this.recipe_id = params.recipeId );
  }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipeWithId(this.recipe_id);
    this.user = this.userService.getUserDetailsWithId(this.recipe.userId);
  }

}
