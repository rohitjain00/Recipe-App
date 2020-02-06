import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../model/recipe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() recipe: Recipe;
  ngOnInit() {
    console.log(this.recipe);
  }

  gotoRecipe(_id: string) {
    this.router.navigate(['dashboard/' + this.recipe._id]);
  }
}
