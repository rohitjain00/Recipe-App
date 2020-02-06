import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  goToPage(path: string) {
    this.router.navigate([`${path}`]);
  }
  logout() {
    this.loginService.logout();
  }
}
