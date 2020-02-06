import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {Recipe} from '../../model/recipe';
import {UserService} from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: User;
  recipes: Recipe[];
  ngOnInit() {
    this.user = this.userService.getUserDetails();
    this.recipes = this.userService.getRecipes();
  }

}
