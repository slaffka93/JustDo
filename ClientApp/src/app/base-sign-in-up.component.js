"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var BaseSignInUpComponent = /** @class */ (function () {
    function BaseSignInUpComponent(http, router) {
        this.http = http;
        this.router = router;
        this.passwordPattern = new RegExp(/^(?=.*\d{1,})(?=.*[A-Z]{2,})(?=.*[!@#\$%\^\&*\)\(+=._-]{1,})[0-9a-zA-Z!@#\$%\^\&*\)\(+=._-]{8,}$/);
    }
    BaseSignInUpComponent.prototype.ngOnInit = function () {
        var token = localStorage.getItem('token');
        if (!util_1.isNullOrUndefined(token)) {
            this.router.navigate(['/home']);
        }
    };
    BaseSignInUpComponent.prototype.onSubmit = function () {
        var _this = this;
        var controls = this.form.controls;
        if (this.form.invalid || this.form.untouched) {
            Object.keys(controls)
                .forEach(function (c) { return controls[c].markAllAsTouched(); });
            return;
        }
        var email = this.form.controls['email'].value;
        var password = this.form.controls['password'].value;
        this.http.post(this.url + 'account/signin', { email: email, password: password }).subscribe(function (result) {
            localStorage.setItem('token', result['token'].toString());
            _this.router.navigate(['/home']);
        }, function (error) {
            console.log(error);
        });
    };
    BaseSignInUpComponent.prototype.getControlInvisibility = function (key) {
        var control = this.form.controls[key];
        return control == null
            ? false
            : control.touched && control.invalid;
    };
    return BaseSignInUpComponent;
}());
exports.BaseSignInUpComponent = BaseSignInUpComponent;
//# sourceMappingURL=base-sign-in-up.component.js.map