import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AlertService} from '../alert.service';
import {Router} from '@angular/router';
import {RegisterService} from './register.service';
import {LocalStorageService} from '../local-storage.service';
import {Auth} from '../model/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private alertService: AlertService,
              private router: Router,
              private localStorageService: LocalStorageService) { }
  registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      retypePassword: ['', Validators.required]
    });
  ngOnInit() {
    if (this.localStorageService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }
  onSubmit() {
    const formValue = this.registerForm.value;
    if (formValue.password !== formValue.retypePassword) {
      this.alertService.flashErrorMessage('Passwords do not match');
      return;
    }
    const user = {
      username: formValue.username,
      password: formValue.password,
      name: formValue.name
    };
    this.registerService.registerUtil(user).subscribe((data: Auth) => {
      console.log('data');
      this.localStorageService.setAuthenticationToken(data.authenticationToken);
      this.localStorageService.setUserName(formValue.username);
      this.alertService.flashSuccessMessage('Registration successful');
      this.router.navigate(['dashboard']);
    });
  }
}
