import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {AlertService} from '../alert.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../local-storage.service';
import {Auth} from '../model/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private alertService: AlertService,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  ngOnInit() {
    if (this.localStorageService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    const user = {
      username : formValue.username,
      password: formValue.password
    };
    this.loginService.loginUtil(user).subscribe((data: Auth) => {
      console.log('data');
      this.localStorageService.setAuthenticationToken(data.authenticationToken);
      this.localStorageService.setUserName(formValue.username);
      this.alertService.flashSuccessMessage('Logged in successfully');
      this.router.navigate(['dashboard']);
    });
  }

}
