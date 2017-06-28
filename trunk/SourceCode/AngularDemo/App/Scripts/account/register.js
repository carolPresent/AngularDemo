"use strict";
//This is the register component.
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
        //Private variables of the component.
        this.firstName = appSettings_1.AppSettings.Empty;
        this.middleName = appSettings_1.AppSettings.Empty;
        this.lastName = appSettings_1.AppSettings.Empty;
        this.userHandle = appSettings_1.AppSettings.Empty;
        this.userPassword = appSettings_1.AppSettings.Empty;
        this.userConfirmPassword = appSettings_1.AppSettings.Empty;
        this.userEmailId = appSettings_1.AppSettings.Empty;
        this.valFirstName = false;
        this.valMiddleName = false;
        this.valLastName = false;
        this.valUserHandle = false;
        this.valUserPassword = false;
        this.valUserEmail = false;
        this.valUserConfirmPassword = false;
        this.messageOnUserIdInput = appSettings_1.AppSettings.Empty;
        this.showSuccessRegisterMessage = false;
        //User model to register.
        this.userModel = {
            FirstName: this.firstName,
            MiddleName: this.middleName,
            LastName: this.lastName,
            Handle: this.userHandle,
            Password: this.userPassword,
            EmailId: this.userEmailId
        };
    }
    //Private functions to send register request
    RegisterComponent.prototype.sendRegisterRequest = function () {
        var _this = this;
        if (!this.validateVariable())
            return;
        this.setRegisterModel();
        this.showSuccessRegisterMessage = false;
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Account, this.userModel).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.resetRegisterData();
                    _this.showSuccessRegisterMessage = true;
                }
                else {
                    _this.setValidationFlagOn(body.data);
                }
            }
            else {
                alert(appSettings_1.AppSettings.Error + " " + response.status);
            }
        }, function (error) {
        });
    };
    //Private function to validate parameters on view.
    RegisterComponent.prototype.validateVariable = function () {
        this.resetValidationKeys();
        var returnItem = true;
        if (this.firstName.length === 0 || this.firstName.length > 30) {
            returnItem = false;
            this.valFirstName = true;
        }
        if (this.lastName.length === 0 || this.lastName.length > 30) {
            returnItem = false;
            this.valLastName = true;
        }
        if (this.middleName.length > 40) {
            returnItem = false;
            this.valMiddleName = true;
        }
        if (this.userPassword.length === 0 || this.userPassword.length > 40) {
            returnItem = false;
            this.valUserPassword = true;
        }
        if (this.userHandle.length === 0 || this.userHandle.length > 40) {
            returnItem = false;
            this.messageOnUserIdInput = appSettings_1.AppSettings.Invalid;
            this.valUserHandle = true;
        }
        if (this.userConfirmPassword !== this.userPassword) {
            returnItem = false;
            this.valUserConfirmPassword = true;
        }
        if (!appSettings_1.AppSettings.validateEmail(this.userEmailId)) {
            returnItem = false;
            this.valUserEmail = true;
        }
        return returnItem;
    };
    //Private function to navigate to login
    RegisterComponent.prototype.navigateToLogin = function () {
        this.router.navigate(['./login']);
    };
    //Private function to set validation flag associated to the ApiKey returned in case of bad request.
    RegisterComponent.prototype.setValidationFlagOn = function (key) {
        this.resetValidationKeys();
        switch (key) {
            case appSettings_1.AppSettings.FirstName:
                this.valFirstName = true;
                break;
            case appSettings_1.AppSettings.MiddleName:
                this.valMiddleName = true;
                break;
            case appSettings_1.AppSettings.LastName:
                this.valLastName = true;
                break;
            case appSettings_1.AppSettings.UserId:
                this.valUserHandle = true;
                this.messageOnUserIdInput = appSettings_1.AppSettings.Invalid;
                break;
            case appSettings_1.AppSettings.UserPassword:
                this.valUserPassword = true;
                break;
            case appSettings_1.AppSettings.UserAlreadyExist:
                this.valUserHandle = true;
                this.messageOnUserIdInput = appSettings_1.AppSettings.AlreadyTaken;
                break;
            case appSettings_1.AppSettings.EmailId:
                this.valUserEmail = true;
                break;
        }
    };
    //Private function to reset validation properties from template.
    RegisterComponent.prototype.resetValidationKeys = function () {
        this.valFirstName = this.valLastName = this.valMiddleName = this.valUserHandle = this.valUserPassword = this.valUserEmail = this.valUserConfirmPassword = false;
    };
    //Private method to reset register data from view.
    RegisterComponent.prototype.resetRegisterData = function () {
        this.userHandle = this.userEmailId = this.userConfirmPassword = this.userPassword = this.firstName = this.middleName = this.lastName = appSettings_1.AppSettings.Empty;
    };
    //Private method to set register data from view.
    RegisterComponent.prototype.setRegisterModel = function () {
        this.userModel.EmailId = this.userEmailId;
        this.userModel.FirstName = this.firstName;
        this.userModel.Handle = this.userHandle;
        this.userModel.LastName = this.lastName;
        this.userModel.MiddleName = this.middleName;
        this.userModel.Password = this.userPassword;
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