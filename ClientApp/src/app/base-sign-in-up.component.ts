import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


export class BaseSignInUpComponent implements OnInit {
  protected form: FormGroup;
  protected url: string;
  protected submitRoute: string;
  protected passwordPattern = new RegExp(/^(?=.*\d{1,})(?=.*[A-Z]{2,})(?=.*[!@#\$%\^\&*\)\(+=._-]{1,})[0-9a-zA-Z!@#\$%\^\&*\)\(+=._-]{8,}$/);

  constructor(protected http: HttpClient, protected router: Router) { }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    if (!isNullOrUndefined(token)) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    var controls = this.form.controls;
    if (this.form.invalid || this.form.untouched) {
      Object.keys(controls)
        .forEach(c => controls[c].markAllAsTouched());
      return;
    }
    var email = this.form.controls['email'].value;
    var password = this.form.controls['password'].value;
    this.http.post(this.url + 'account/signin', { email, password }).subscribe(
      result => {
        localStorage.setItem('token', result['token'].toString());
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      });
  }

  getControlInvisibility(key: string) {
    var control = this.form.controls[key];
    return control == null
      ? false
      : control.touched && control.invalid;
  }
}
