"use strict";
//This is the insurance component.
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
var InsuranceComponent = (function () {
    function InsuranceComponent(serverService, appComponent, router) {
        this.serverService = serverService;
        this.appComponent = appComponent;
        this.router = router;
        //Insurance model to add/save a new insurance.
        this.insuranceModel = {
            Name: '',
            Address: '',
            PhoneNumber: 0,
            InsurancePublicId: ''
        };
        //Private variables of component.
        this.insName = appSettings_1.AppSettings.Empty;
        this.insAddress = appSettings_1.AppSettings.Empty;
        this.insPublicId = appSettings_1.AppSettings.Empty;
        this.valName = false;
        this.valPhone = false;
        this.valAddress = false;
        this.valPublicId = false;
    }
    InsuranceComponent.prototype.ngOnInit = function () {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
    };
    //Private function to save insurance. Send a request Server.Service to interact with HTTP.
    InsuranceComponent.prototype.saveInsurance = function () {
        var _this = this;
        this.setInsuranceModel();
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Insurance, this.insuranceModel).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.clearInsuranceData();
                    alert(appSettings_1.AppSettings.InsuranceAdded);
                }
                else {
                    _this.setValidationFlagOn(body.data);
                }
            }
            else {
                alert("" + (appSettings_1.AppSettings.Error, response.status));
            }
        }, function (error) {
            console.log(appSettings_1.AppSettings.SomeErrorOccured);
        });
    };
    //Private function to set validation flag associated to the ApiKey returned in case of bad request.
    InsuranceComponent.prototype.setValidationFlagOn = function (key) {
        this.resetValidationKeys();
        switch (key) {
            case appSettings_1.AppSettings.Name:
                this.valName = true;
                break;
            case appSettings_1.AppSettings.Address:
                this.valAddress = true;
                break;
            case appSettings_1.AppSettings.PhoneNumber:
                this.valPhone = true;
                break;
            case appSettings_1.AppSettings.InsurancePublicId:
                this.valPublicId = true;
                break;
        }
    };
    //Private function to reset validation properties from template.
    InsuranceComponent.prototype.resetValidationKeys = function () {
        this.valAddress = this.valName = this.valPhone = this.valPublicId = false;
    };
    //Private function to set insurance model from template properties.
    InsuranceComponent.prototype.setInsuranceModel = function () {
        this.insuranceModel.Address = this.insAddress;
        this.insuranceModel.Name = this.insName;
        this.insuranceModel.PhoneNumber = this.insPhone;
        this.insuranceModel.InsurancePublicId = this.insPublicId;
    };
    //Private function to clear insurance properties and insurance model.
    InsuranceComponent.prototype.clearInsuranceData = function () {
        this.insAddress = this.insPublicId = this.insName = appSettings_1.AppSettings.Empty;
        this.insPhone = null;
        this.resetValidationKeys();
    };
    return InsuranceComponent;
}());
InsuranceComponent = __decorate([
    core_1.Component({
        selector: 'insurance',
        templateUrl: '/Home/Insurance'
    }),
    __metadata("design:paramtypes", [servers_service_1.ServerService, app_1.AppComponent, router_1.Router])
], InsuranceComponent);
exports.InsuranceComponent = InsuranceComponent;
//# sourceMappingURL=insurance.js.map