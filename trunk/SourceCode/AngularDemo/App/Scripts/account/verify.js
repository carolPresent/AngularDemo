"use strict";
//This is the verify component.
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
var VerifyComponent = (function () {
    function VerifyComponent(appComponent, serverService, router) {
        this.appComponent = appComponent;
        this.serverService = serverService;
        this.router = router;
        //Private variables of the component
        this.handle = appSettings_1.AppSettings.Empty;
        this.password = appSettings_1.AppSettings.Empty;
        this.verificationCode = appSettings_1.AppSettings.Empty;
        this.valHandle = false;
        this.valPasssword = false;
        this.valVerificationCode = false;
        this.showVerificationMessage = false;
        this.colorClassForVerificationMessage = appSettings_1.AppSettings.TextDanger;
        //This is the verification model used to send a verification request.
        this.verificationModel = {
            Handle: this.handle,
            Password: this.password,
            VerificationCode: this.verificationCode
        };
    }
    VerifyComponent.prototype.ngOnInit = function () {
        if (this.appComponent.loggedIn) {
            this.router.navigate(['./patient']);
        }
    };
    //Private function to navigate to login page
    VerifyComponent.prototype.navigateToLogin = function () {
        this.router.navigate(['./login']);
    };
    //Private function to send verification request to verify a user account.
    VerifyComponent.prototype.sendVerificationRequest = function () {
        var _this = this;
        if (!this.validateVariables())
            return;
        this.setVerificationModel();
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Verify, this.verificationModel).subscribe(function (response) {
            _this.showVerificationMessage = true;
            var body = response.json();
            _this.verificationMessage = body.data;
            console.log(_this.verificationMessage);
            if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                _this.resetVerificationData();
                _this.colorClassForVerificationMessage = appSettings_1.AppSettings.TextSuccess;
            }
            else {
                _this.setValidationFlagOn(body.data);
                _this.colorClassForVerificationMessage = appSettings_1.AppSettings.TextDanger;
            }
        }, function (error) {
            alert(appSettings_1.AppSettings.SomeErrorOccured);
        });
    };
    //Private method to validate variables for verification request
    VerifyComponent.prototype.validateVariables = function () {
        this.valHandle = this.valPasssword = this.valVerificationCode = false;
        var returnItem = true;
        if (this.handle.length === 0) {
            this.valHandle = true;
            returnItem = false;
        }
        if (this.password.length === 0) {
            this.valPasssword = true;
            returnItem = false;
        }
        if (this.verificationCode.length === 0) {
            this.valVerificationCode = true;
            returnItem = false;
        }
        return returnItem;
    };
    //Private method to reset verification data from view
    VerifyComponent.prototype.resetVerificationData = function () {
        this.handle = this.password = this.verificationCode = appSettings_1.AppSettings.Empty;
        this.valHandle = this.valPasssword = this.valVerificationCode = false;
    };
    //Private function to set validation key in case of bad request
    VerifyComponent.prototype.setValidationFlagOn = function (key) {
        switch (key) {
            case appSettings_1.AppSettings.Handle:
                this.valHandle = true;
                break;
            case appSettings_1.AppSettings.Password:
                this.valPasssword = true;
                break;
            case appSettings_1.AppSettings.VerificationCode:
                this.valVerificationCode = true;
                break;
        }
    };
    //Private function to set verification model from view input elements.
    VerifyComponent.prototype.setVerificationModel = function () {
        this.verificationModel.Handle = this.handle;
        this.verificationModel.Password = this.password;
        this.verificationModel.VerificationCode = this.verificationCode;
    };
    return VerifyComponent;
}());
VerifyComponent = __decorate([
    core_1.Component({
        selector: 'verify',
        templateUrl: '/Home/Verify'
    }),
    __metadata("design:paramtypes", [app_1.AppComponent, servers_service_1.ServerService, router_1.Router])
], VerifyComponent);
exports.VerifyComponent = VerifyComponent;
//# sourceMappingURL=verify.js.map