"use strict";
//This is the forgot password component.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var servers_service_1 = require("../servers.service");
var appSettings_1 = require("../appSettings");
var app_1 = require("../app");
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(serverService, appComponent, router) {
        this.serverService = serverService;
        this.appComponent = appComponent;
        this.router = router;
        //Private variables used in the component.
        this.userHandle = appSettings_1.AppSettings.Empty;
        this.userVerificationCode = appSettings_1.AppSettings.Empty;
        this.userPassword = appSettings_1.AppSettings.Empty;
        this.userConfirmPassword = appSettings_1.AppSettings.Empty;
        this.valHandle = false;
        this.valVerificationCode = false;
        this.valPassword = false;
        this.valConfirmPassword = false;
        this.hideForgotPasswordFrom = false;
        this.hideResetPasswordForm = true;
        this.heading = appSettings_1.AppSettings.ForgotPasswordFormHeading;
        this.statusMessage = appSettings_1.AppSettings.Empty;
        this.statusMessageClass = appSettings_1.AppSettings.TextSuccess;
        //Private model to send a forgot password request as well as reset password request
        this.commonRequestModel = {
            Handle: this.userHandle,
            VerificationCode: this.userVerificationCode,
            Password: this.userPassword
        };
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        if (this.appComponent.loggedIn) {
            this.router.navigate(['./login']);
        }
    };
    //Private method to send a POST forgot password request
    ForgotPasswordComponent.prototype.sendForgotPasswordRequest = function () {
        var _this = this;
        if (!this.validateVariableForgotPassword())
            return;
        this.setCommonRequestModel();
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.ForgotPassword, this.commonRequestModel).subscribe(function (response) {
            var body = response.json();
            if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                _this.statusMessageClass = appSettings_1.AppSettings.TextSuccess;
                _this.statusMessage = appSettings_1.AppSettings.ForgotPasswordRequestCreatedSuccessfully;
                setTimeout(function () {
                    _this.heading = appSettings_1.AppSettings.ResetPasswordFormHeading;
                    _this.hideForgotPasswordFrom = true;
                    _this.hideResetPasswordForm = false;
                }, 2000);
            }
            else {
                _this.statusMessage = body.data;
                _this.statusMessageClass = appSettings_1.AppSettings.TextDanger;
            }
        }, function (error) {
        });
    };
    //Private function to send PUT reset password request
    ForgotPasswordComponent.prototype.sendResetPasswordRequest = function () {
        var _this = this;
        if (!this.validateVariableResetPassword())
            return;
        this.setCommonRequestModel();
        this.serverService.putRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.ResetPassword, this.commonRequestModel).subscribe(function (response) {
            var body = response.json();
            if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                _this.statusMessageClass = appSettings_1.AppSettings.TextSuccess;
                _this.statusMessage = appSettings_1.AppSettings.ResetPasswordSuccessful;
                setTimeout(function () {
                    _this.router.navigate(['./login']);
                }, 2000);
            }
            else {
                _this.statusMessageClass = appSettings_1.AppSettings.TextDanger;
                _this.statusMessage = body.data;
            }
        }, function (error) {
        });
    };
    //Private method to validate variables for forgot password POST request
    ForgotPasswordComponent.prototype.validateVariableForgotPassword = function () {
        var returnItem = true;
        if (this.userHandle.length === 0) {
            returnItem = false;
            this.valHandle = true;
        }
        return returnItem;
    };
    //Private method to validate variables for reset password PUT request
    ForgotPasswordComponent.prototype.validateVariableResetPassword = function () {
        var returnItem = true;
        if (this.userPassword.length === 0 || this.userPassword.length > 40) {
            returnItem = false;
            this.valPassword = true;
        }
        if (this.userVerificationCode.length === 0) {
            returnItem = false;
            this.valVerificationCode = true;
        }
        if (this.userPassword != this.userConfirmPassword) {
            returnItem = false;
            this.valConfirmPassword = true;
        }
        return returnItem;
    };
    //Private method to reset validation flags from view.
    ForgotPasswordComponent.prototype.resetValidationFlags = function () {
        this.valHandle = this.valConfirmPassword = this.valPassword = this.valVerificationCode = false;
    };
    //Private method to set forgot password/reset password model.
    ForgotPasswordComponent.prototype.setCommonRequestModel = function () {
        this.commonRequestModel.Handle = this.userHandle;
        this.commonRequestModel.Password = this.userPassword;
        this.commonRequestModel.VerificationCode = this.userVerificationCode;
    };
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent = __decorate([
    core_1.Component({
        selector: 'forgotpassword',
        templateUrl: '/Home/ForgotPassword'
    }),
    __metadata("design:paramtypes", [servers_service_1.ServerService, app_1.AppComponent, router_1.Router])
], ForgotPasswordComponent);
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgotpassword.js.map