import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {Recipe} from '../model/recipe';
import {DashboardService} from './dashboard.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RecipeList} from '../model/recipe-list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
              private dashboardService: DashboardService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  currentUserUsername: string;
  recipes: Recipe[];
  searchForm: FormGroup;
  start: number;
  limit: number;
  ngOnInit() {
    this.start = 0;
    this.limit = 10;
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    if (!this.localStorageService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.currentUserUsername = this.localStorageService.getUserName();
    this.dashboardService.getAllUtil('', this.start, this.limit).subscribe((data: RecipeList) => {
      this.recipes = data.recipes;
    });
  }

  search() {
      this.dashboardService.getAllUtil(this.searchForm.value.search, this.start, this.limit).subscribe((data: RecipeList) => {
      this.recipes = data.recipes;
    });
  }

  next() {
    if (this.recipes.length <= 10) {
      return;
    }
    this.start += this.limit;
    this.search();
  }
  previous() {
    if (this.start === 0) {
      return;
    }
    this.start -= this.limit;
    this.search();
  }
}
