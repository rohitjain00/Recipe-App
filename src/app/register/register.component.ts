import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AlertService} from "../alert.service";
import {Router} from "@angular/router";
import {RegisterService} from "./register.service";
import {LocalStorageService} from "../local-storage.service";

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
      'name': ['', Validators.required],
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  ngOnInit() {
    if (this.localStorageService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }
  onSubmit() {
    const formValue = this.registerForm.value;
    if (!this.registerService.register(formValue.name, formValue.username, formValue.password)) {
      this.alertService.flashErrorMessage('User already Exists!. Please login to continue');
    } else {
      this.alertService.flashSuccessMessage('Registration successful');
      this.router.navigate(['dashboard']);
    }
  }

}
