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
        this.insName = '';
        this.insAddress = '';
        this.insPublicId = '';
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
    //Private functions of component.
    InsuranceComponent.prototype.saveInsurance = function () {
        var _this = this;
        this.setInsuranceModel();
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Insurance, this.insuranceModel).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.clearInsuranceData();
                    alert('Insurance added successfully.');
                }
                else {
                    _this.setValidationFlagOn(body.data);
                }
            }
        }, function (error) {
            console.log('Some error occured.');
        });
    };
    InsuranceComponent.prototype.setValidationFlagOn = function (key) {
        this.resetValidationKeys();
        switch (key) {
            case "Name":
                this.valName = true;
                break;
            case "Address":
                this.valAddress = true;
                break;
            case "PhoneNumber":
                this.valPhone = true;
                break;
            case "InsurancePublicId":
                this.valPublicId = true;
                break;
        }
    };
    InsuranceComponent.prototype.resetValidationKeys = function () {
        this.valAddress = this.valName = this.valPhone = this.valPublicId = false;
    };
    InsuranceComponent.prototype.setInsuranceModel = function () {
        this.insuranceModel.Address = this.insAddress;
        this.insuranceModel.Name = this.insName;
        this.insuranceModel.PhoneNumber = this.insPhone;
        this.insuranceModel.InsurancePublicId = this.insPublicId;
    };
    InsuranceComponent.prototype.clearInsuranceData = function () {
        this.insAddress = this.insPublicId = this.insName = '';
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