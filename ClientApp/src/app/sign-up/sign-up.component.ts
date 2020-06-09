import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { isUndefined } from 'util';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BaseSignInUpComponent } from '../base-sign-in-up.component';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent extends BaseSignInUpComponent implements OnInit  {
  private signUpForm: FormGroup;

  constructor(protected http: HttpClient, protected router: Router, @Inject('BASE_URL') baseUrl: string) {
    super(http, router);

    this.signUpForm = new FormGroup({
      "email": new FormControl("", Validators.email),
      "password": new FormControl("", Validators.pattern(super.passwordPattern)),
      "confirmPassword": new FormControl("", [Validators.required, Validators.minLength(1), this.matchPasswords.bind(this)])
    });
    super.url = baseUrl;
    super.submitRoute = 'account';
    super.form = this.signUpForm;
  }

  checkConfirmedPassword() {
    var control = this.signUpForm.controls['confirmPassword'];
    return !isUndefined(control)
      ? control.getError('unconfirmedPassword')
      : false;
  }

  private matchPasswords(control: FormControl): ValidationErrors {
    if (!isUndefined(this.signUpForm)) {
      var password = this.signUpForm.controls['password'];
      var confirmedPassword = control.value;
      if (password != null && confirmedPassword != null
        && password.value != confirmedPassword) {
        return {
          'unconfirmedPassword': true
        };
      }
    }
    return null;
  }

}
