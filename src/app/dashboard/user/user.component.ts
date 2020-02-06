import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../model/recipe';
import {UserService} from './user.service';
import {RecipeList} from '../../model/recipe-list';
import {LocalStorageService} from '../../local-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,
              private localStorageService: LocalStorageService) { }
  username: string;
  recipes: Recipe[];
  ngOnInit() {
    this.username = this.localStorageService.getUserName();
    this.userService.getRecipes().subscribe((data: RecipeList) => {
      this.recipes = data.recipes;
    });
  }


}
