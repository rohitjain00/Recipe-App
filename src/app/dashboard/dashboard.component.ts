import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {Recipe} from '../model/recipe';
import {DashboardService} from './dashboard.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    if (!this.localStorageService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.currentUserUsername = this.localStorageService.getUserName();
    this.recipes = this.dashboardService.getAllRecipe();
  }

  search() {
    if (this.searchForm.value.search === '') {
      this.recipes = this.dashboardService.getAllRecipe();
    } else {
      this.recipes = this.dashboardService.getRecipe(this.searchForm.value.search);
    }
  }
}
