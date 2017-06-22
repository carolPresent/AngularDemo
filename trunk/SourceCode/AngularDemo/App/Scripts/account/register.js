"use strict";
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
var RegisterComponent = (function () {
    function RegisterComponent(appComponent, serverService, router) {
        this.appComponent = appComponent;
        this.serverService = serverService;
        this.router = router;
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.userId = '';
        this.userPassword = '';
        this.valFirstName = false;
        this.valMiddleName = false;
        this.valLastName = false;
        this.valUserId = false;
        this.valUserPassword = false;
        this.messageOnUserIdInput = '';
        this.userModel = {
            FirstName: '',
            MiddleName: '',
            LastName: '',
            UserId: '',
            UserPassword: ''
        };
    }
    RegisterComponent.prototype.sendRegisterRequest = function () {
        var _this = this;
        this.setUserModel();
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Account, this.userModel).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.router.navigate(['./login']);
                }
                else {
                    _this.setValidationFlagOn(body.data);
                }
            }
            else {
                alert("Error " + response.status);
            }
        }, function (error) {
        });
    };
    RegisterComponent.prototype.navigateToRegister = function () {
        this.router.navigate(['./login']);
    };
    RegisterComponent.prototype.setValidationFlagOn = function (key) {
        this.resetValidationKeys();
        switch (key) {
            case "FirstName":
                this.valFirstName = true;
                break;
            case "MiddleName":
                this.valMiddleName = true;
                break;
            case "LastName":
                this.valLastName = true;
                break;
            case "UserId":
                this.valUserId = true;
                this.messageOnUserIdInput = 'Invalid';
                break;
            case "UserPassword":
                this.valUserPassword = true;
                break;
            case "UserAlreadyExist":
                this.valUserId = true;
                this.messageOnUserIdInput = 'Already taken';
                break;
        }
    };
    RegisterComponent.prototype.setUserModel = function () {
        this.userModel.FirstName = this.firstName;
        this.userModel.MiddleName = this.middleName;
        this.userModel.LastName = this.lastName;
        this.userModel.UserId = this.userId;
        this.userModel.UserPassword = this.userPassword;
    };
    RegisterComponent.prototype.resetUserdata = function () {
        this.firstName = this.middleName = this.lastName = this.userId = this.userPassword = '';
    };
    RegisterComponent.prototype.resetValidationKeys = function () {
        this.valFirstName = this.valLastName = this.valMiddleName = this.valUserId = this.valUserPassword = false;
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: '/Home/Register'
    }),
    __metadata("design:paramtypes", [app_1.AppComponent, servers_service_1.ServerService, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.js.map