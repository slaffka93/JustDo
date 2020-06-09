import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BaseSignInUpComponent } from '../base-sign-in-up.component';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent extends BaseSignInUpComponent implements OnInit {

  private signInForm: FormGroup;

  constructor(protected http: HttpClient, protected router: Router, @Inject('BASE_URL') baseUrl: string) {
    super(http, router);

    this.signInForm = new FormGroup({
      "email": new FormControl("", Validators.email),
      "password": new FormControl("", Validators.pattern(super.passwordPattern)),
    });
    super.url = baseUrl;
    super.submitRoute = 'account/signin';
    super.form = this.signInForm;
  }
}
