import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeComponent } from './recipe/recipe.component';
import { UserComponent } from './user/user.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';


@NgModule({
  declarations: [DashboardComponent, RecipeSearchComponent, RecipeComponent, UserComponent, RecipeViewComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
