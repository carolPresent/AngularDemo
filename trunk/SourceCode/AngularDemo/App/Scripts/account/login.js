"use strict";
//This is the login component.
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
var app_1 = require("../app");
var servers_service_1 = require("../servers.service");
var appSettings_1 = require("../appSettings");
var LoginComponent = (function () {
    function LoginComponent(appComponent, serverService, router) {
        this.appComponent = appComponent;
        this.serverService = serverService;
        this.router = router;
        //Private variable of the component.
        this.userHandle = appSettings_1.AppSettings.Empty;
        this.userPassword = appSettings_1.AppSettings.Empty;
        this.showLoggingInLabel = false;
        this.showUnsuccessfulLoginLabel = false;
        this.showUnverifiedAccountLoginMessage = false;
        this.valHandle = false;
        this.valPassword = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.appComponent.loggedIn) {
            this.router.navigate(['./patient']);
        }
    };
    //Private function to navigate to register template
    LoginComponent.prototype.navigateToRegister = function () {
        this.router.navigate(['./register']);
    };
    //Private function to send login request
    LoginComponent.prototype.sendLoginRequest = function () {
        var _this = this;
        if (!this.validateVariables())
            return;
        this.showLoggingInLabel = true;
        this.showUnsuccessfulLoginLabel = false;
        this.showUnverifiedAccountLoginMessage = false;
        var data = appSettings_1.AppSettings.UserName + "=" + this.userHandle + "&" + appSettings_1.AppSettings.Password + "=" + this.userPassword + "&" + appSettings_1.AppSettings.GrantType + "=" + appSettings_1.AppSettings.Password;
        this.serverService.loginRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Login, data).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                _this.appComponent.loggedIn = true;
                _this.appComponent.putObject(appSettings_1.AppSettings.AuthCookie, body);
                location.href = "/Home/Main";
            }
        }, function (error) {
            var body = JSON.parse(error._body);
            _this.showLoggingInLabel = false;
            if (body.error_description === appSettings_1.AppSettings.UserNotVerified)
                _this.showUnverifiedAccountLoginMessage = true;
            else
                _this.showUnsuccessfulLoginLabel = true;
        });
    };
    //Private function to validate parameters on view.
    LoginComponent.prototype.validateVariables = function () {
        this.valHandle = this.valPassword = false;
        var returnItem = true;
        if (this.userHandle.length === 0) {
            returnItem = false;
            this.valHandle = true;
        }
        if (this.userPassword.length === 0) {
            returnItem = false;
            this.valPassword = true;
        }
        return returnItem;
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: '/Home/Login'
    }),
    __metadata("design:paramtypes", [app_1.AppComponent, servers_service_1.ServerService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.js.map