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
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var servers_service_1 = require("../servers.service");
var appSettings_1 = require("../appSettings");
var app_1 = require("../app");
var commonFunctions_1 = require("../server/commonFunctions");
var InsuranceComponent = (function () {
    function InsuranceComponent(serverService, appComponent, router, commonFunctions) {
        this.serverService = serverService;
        this.appComponent = appComponent;
        this.router = router;
        this.commonFunctions = commonFunctions;
        //Private variables of component.
        this.insName = appSettings_1.AppSettings.Empty;
        this.insAddress = appSettings_1.AppSettings.Empty;
        this.insPublicId = appSettings_1.AppSettings.Empty;
        this.valName = false;
        this.valPhone = false;
        this.valAddress = false;
        this.valPublicId = false;
        this.insuranceList = [];
        this.insuranceModalSaveButtonValue = appSettings_1.AppSettings.Save;
        this.addInsuranceModalTitle = appSettings_1.AppSettings.NewInsurance;
        //Insurance model to add/save a new insurance.
        this.insuranceModel = {
            Name: this.insName,
            Address: this.insAddress,
            PhoneNumber: this.insPhone,
            InsurancePublicId: this.insPublicId,
            Id: 0
        };
    }
    InsuranceComponent.prototype.ngOnInit = function () {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
        this.fetchInsuranceList();
    };
    //Private function to save insurance. Send a request Server.Service to interact with HTTP.
    InsuranceComponent.prototype.saveInsurance = function () {
        var _this = this;
        if (!this.validateVariables())
            return;
        if (this.insuranceModalSaveButtonValue === appSettings_1.AppSettings.Modify) {
            this.sendInsuranceEditRequest();
            return;
        }
        this.setInsuranceModel();
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Insurance, this.insuranceModel).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.clearInsuranceData();
                    alert(appSettings_1.AppSettings.InsuranceAdded);
                    _this.fetchInsuranceList();
                    _this.toggleInsuranceModal(false);
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
    //Private function to validate variables on view in case of put request to insurance
    InsuranceComponent.prototype.validateVariables = function () {
        this.resetValidationKeys();
        var returnItem = true;
        if (this.insName.length === 0 || this.insName.length > 90) {
            returnItem = false;
            this.valName = true;
        }
        if (this.insAddress.length === 0 || this.insAddress.length > 990) {
            returnItem = false;
            this.valAddress = true;
        }
        if (this.insPhone == null || this.insPhone < 1e9 || this.insPhone >= 1e10) {
            returnItem = false;
            this.valPhone = true;
        }
        if (this.insPublicId.length === 0 || this.insName.length > 30) {
            returnItem = false;
            this.valPublicId = true;
        }
        return returnItem;
    };
    //Private method to set basic settings on view for better user experience.
    InsuranceComponent.prototype.editInsurance = function (insurance) {
        this.addInsuranceModal.open();
        this.insName = insurance.Name;
        this.insAddress = insurance.Address;
        this.insPhone = insurance.PhoneNumber;
        this.insPublicId = insurance.InsurancePublicId;
        this.insuranceModel.Id = insurance.Id;
        this.addInsuranceModalTitle = appSettings_1.AppSettings.ModifyInsurance;
        this.insuranceModalSaveButtonValue = appSettings_1.AppSettings.Modify;
    };
    //Private method to send a put request to modify insurance data
    InsuranceComponent.prototype.sendInsuranceEditRequest = function () {
        var _this = this;
        this.setInsuranceModel();
        this.serverService.putRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Insurance, this.insuranceModel).subscribe(function (response) {
            var body = response.json();
            if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                alert(appSettings_1.AppSettings.InsuranceUpdated);
                _this.fetchInsuranceList();
            }
            else {
                if (body.data === appSettings_1.AppSettings.Unauthorized)
                    alert(appSettings_1.AppSettings.UnauthorizedInsuranceEdit);
            }
        }, function (error) {
            alert(appSettings_1.AppSettings.SomeErrorOccured);
        });
        this.clearEditFormData();
        this.addInsuranceModal.close();
    };
    //Private method to clear edit form data.
    InsuranceComponent.prototype.clearEditFormData = function () {
        this.addInsuranceModalTitle = appSettings_1.AppSettings.NewInsurance;
        this.insuranceModalSaveButtonValue = appSettings_1.AppSettings.Save;
        this.clearInsuranceData();
    };
    //Private method to fetch insurance list by common function service
    InsuranceComponent.prototype.fetchInsuranceList = function () {
        var _this = this;
        this.commonFunctions.getInsuranceList(function (data) {
            _this.insuranceList = data;
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
    //Private function to toggle open/close for add insurance modal
    InsuranceComponent.prototype.toggleInsuranceModal = function (bit) {
        this.resetValidationKeys();
        this.clearEditFormData();
        if (bit)
            this.addInsuranceModal.open();
        else
            this.addInsuranceModal.close();
    };
    //Private function to reset validation properties from template.
    InsuranceComponent.prototype.resetValidationKeys = function () {
        this.valAddress = this.valName = this.valPhone = this.valPublicId = false;
    };
    //Private function to clear insurance properties and insurance model.
    InsuranceComponent.prototype.clearInsuranceData = function () {
        this.insAddress = this.insPublicId = this.insName = appSettings_1.AppSettings.Empty;
        this.insPhone = null;
        this.resetValidationKeys();
    };
    //Private method to set insurance model bounded to view input elements.
    InsuranceComponent.prototype.setInsuranceModel = function () {
        this.insuranceModel.Address = this.insAddress;
        this.insuranceModel.InsurancePublicId = this.insPublicId;
        this.insuranceModel.Name = this.insName;
        this.insuranceModel.PhoneNumber = this.insPhone;
    };
    return InsuranceComponent;
}());
__decorate([
    core_1.ViewChild('addInsurance'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], InsuranceComponent.prototype, "addInsuranceModal", void 0);
InsuranceComponent = __decorate([
    core_1.Component({
        selector: 'insurance',
        templateUrl: '/Home/Insurance'
    }),
    __metadata("design:paramtypes", [servers_service_1.ServerService, app_1.AppComponent, router_1.Router, commonFunctions_1.CommonFunctionService])
], InsuranceComponent);
exports.InsuranceComponent = InsuranceComponent;
//# sourceMappingURL=insurance.js.map