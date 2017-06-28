"use strict";
//This is the patient insurance component.
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
var app_1 = require("../app");
var servers_service_1 = require("../servers.service");
var appSettings_1 = require("../appSettings");
var commonFunctions_1 = require("../server/commonFunctions");
var PatientInsuranceComponent = (function () {
    function PatientInsuranceComponent(appComponent, serverService, router, commonFunctions) {
        this.appComponent = appComponent;
        this.serverService = serverService;
        this.router = router;
        this.commonFunctions = commonFunctions;
        this.insPubId = appSettings_1.AppSettings.Empty;
        this.patientList = [];
        this.insuranceList = [];
        this.patientInsuranceList = [];
        this.searchPatient = appSettings_1.AppSettings.Empty;
        this.searchInsurance = appSettings_1.AppSettings.Empty;
        this.searchPatientInsurance = appSettings_1.AppSettings.Empty;
        this.valPatId = false;
        this.valInsId = false;
        this.valInsPubId = false;
        this.buttonNameForPatientInsuranceSave = appSettings_1.AppSettings.Save;
        //The patient insurance model
        this.patientInsuranceModel = {
            PatientId: this.patId,
            InsuranceId: this.insId,
            InsurancePublicId: this.insPubId,
            Id: 0
        };
    }
    PatientInsuranceComponent.prototype.ngOnInit = function () {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
    };
    //Private function to save patient insurance by sending AJAX using Server.Service component.
    PatientInsuranceComponent.prototype.savePatientInsurance = function () {
        var _this = this;
        if (!this.validateVariable())
            return;
        if (this.buttonNameForPatientInsuranceSave === appSettings_1.AppSettings.Modify) {
            this.sendEditPatientInsuranceRequest();
            return;
        }
        this.setPatientInsuranceModel();
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.PatientInsurance, this.patientInsuranceModel).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status == appSettings_1.AppSettings.SuccessStatus) {
                    _this.clearPatientInsuranceData();
                    alert(appSettings_1.AppSettings.PatientInsuranceAdded);
                }
                else {
                    _this.setValidationFlagOn(body.data);
                }
            }
            else {
                alert(appSettings_1.AppSettings.Error + " " + response.status);
            }
        }, function (error) {
            alert(appSettings_1.AppSettings.SomeErrorOccured);
        });
    };
    //Private function to validate patient insurance variables.
    PatientInsuranceComponent.prototype.validateVariable = function () {
        var returnItem = true;
        if (this.patId == null || this.patId === 0) {
            returnItem = false;
            this.valPatId = true;
        }
        if (this.insId == null || this.insId === 0) {
            returnItem = false;
            this.valInsId = true;
        }
        if (this.insPubId.length === 0 || this.insPubId.length > 30) {
            returnItem = false;
            this.valInsPubId = true;
        }
        return returnItem;
    };
    //Private function to get a list of patient insurance from backend
    PatientInsuranceComponent.prototype.getPatientInsuranceList = function () {
        var _this = this;
        this.serverService.getRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.PatientInsurance).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.patientInsuranceList = JSON.parse(body.data);
                    _this.currentPatInsList = _this.patientInsuranceList;
                }
                else {
                    alert("" + (appSettings_1.AppSettings.Insurance, appSettings_1.AppSettings.ListCouldNotLoad));
                }
            }
            else {
                alert(appSettings_1.AppSettings.Error + " " + response.status);
            }
        }, function (error) {
            alert(appSettings_1.AppSettings.SomeErrorOccured);
        });
    };
    //Private method to send a put request to modify patient insurance data
    PatientInsuranceComponent.prototype.sendEditPatientInsuranceRequest = function () {
        this.setPatientInsuranceModel();
        this.serverService.putRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.PatientInsurance, this.patientInsuranceModel).subscribe(function (response) {
            var body = response.json();
            if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                alert(appSettings_1.AppSettings.PatientInsuranceUpdated);
            }
            else {
                if (body.data === appSettings_1.AppSettings.Unauthorized)
                    alert(appSettings_1.AppSettings.UnauthorizedPatienEdit);
            }
        }, function (error) {
            alert(appSettings_1.AppSettings.SomeErrorOccured);
        });
        this.buttonNameForPatientInsuranceSave = appSettings_1.AppSettings.Save;
        this.clearPatientInsuranceData();
        this.patientinsuranceModal.close();
    };
    //Private function to filter patient list based on user input. Filter by FirstName/PhoneNumber/Address
    PatientInsuranceComponent.prototype.filterPatientList = function () {
        var _this = this;
        this.currentPatList = this.patientList.filter(function (patient) {
            return patient.FirstName.toLowerCase().includes(_this.searchPatient) || patient.PhoneNumber.includes(_this.searchPatient)
                || patient.Address.toLowerCase().includes(_this.searchPatient);
        });
    };
    //Private function to filter insurance list based on user input. Filter by NAme/InsurancePublicId
    PatientInsuranceComponent.prototype.filterInsuranceList = function () {
        var _this = this;
        this.currentInsList = this.insuranceList.filter(function (insurance) {
            return insurance.Name.toLowerCase().includes(_this.searchInsurance) || insurance.InsurancePublicId.includes(_this.searchInsurance);
        });
    };
    //Private function to filter patient insurance list based on user input. Filter by patient FirstName, paitent Address, insruance Name and insurance InsurancePublicId
    PatientInsuranceComponent.prototype.filterPatientInsuranceList = function () {
        var _this = this;
        this.currentPatInsList = this.patientInsuranceList.filter(function (patientInsurance) {
            var patientInfo = patientInsurance.PatientInfo;
            var insuranceInfo = patientInsurance.InsuranceInfo;
            return patientInfo.FirstName.toLowerCase().includes(_this.searchPatientInsurance) || patientInfo.Address.includes(_this.searchPatientInsurance) ||
                insuranceInfo.Name.toLowerCase().includes(_this.searchPatientInsurance) || insuranceInfo.InsurancePublicId.includes(_this.searchPatientInsurance);
        });
    };
    //Private function to open patient Modal to show list of patient.
    PatientInsuranceComponent.prototype.openPatientModal = function () {
        var _this = this;
        this.commonFunctions.getPatientList(function (data) {
            _this.patientList = _this.currentPatList = data;
        });
        this.patientModal.open();
    };
    //Private function to open insurance modal to show list of insurances.
    PatientInsuranceComponent.prototype.openInsuranceModal = function () {
        var _this = this;
        this.commonFunctions.getInsuranceList(function (data) {
            _this.insuranceList = _this.currentInsList = data;
        });
        this.insuranceModal.open();
    };
    //Private function to open patient insurance modal to show list of patient insurances.
    PatientInsuranceComponent.prototype.openPatientInsuranceModal = function () {
        this.currentPatInsList = this.patientInsuranceList;
        this.getPatientInsuranceList();
        this.patientinsuranceModal.open();
    };
    //Private function to select patient when user click on a patient name in the user modal to select some patient.
    PatientInsuranceComponent.prototype.selectPatient = function (patientId) {
        this.resetValidationKeys();
        this.patId = patientId;
        this.patientModal.close();
    };
    //Private function to select insurance when user click on a insurance name in the user modal to select some insurance.
    PatientInsuranceComponent.prototype.selectInsurance = function (insuranceId, insurancePublicId) {
        this.resetValidationKeys();
        this.insId = insuranceId;
        this.insPubId = insurancePublicId;
        this.insuranceModal.close();
    };
    //Private function to select patient insurance when user click on a patient name in the user modal to select some patient insurance.
    PatientInsuranceComponent.prototype.selectPatientInsurance = function (patientInfo, insuranceInfo, patientInsuranceId) {
        this.resetValidationKeys();
        this.patId = patientInfo.Id;
        this.insId = insuranceInfo.Id;
        this.insPubId = insuranceInfo.InsurancePublicId;
        this.patientInsuranceModel.Id = patientInsuranceId;
        this.patientinsuranceModal.close();
        this.buttonNameForPatientInsuranceSave = appSettings_1.AppSettings.Modify;
    };
    //Private function to concatenate first name and last name and return it.
    PatientInsuranceComponent.prototype.concatNames = function (firstName, lastName) {
        return firstName + appSettings_1.AppSettings.Space + lastName;
    };
    //Private function to set validation flag associated to the ApiKey returned in case of bad request.
    PatientInsuranceComponent.prototype.setValidationFlagOn = function (key) {
        this.resetValidationKeys();
        switch (key) {
            case appSettings_1.AppSettings.PatientId:
                this.valPatId = true;
                break;
            case appSettings_1.AppSettings.InsuranceId:
                this.valInsId = true;
                break;
            case appSettings_1.AppSettings.InsurancePublicId:
                this.valInsPubId = true;
                break;
        }
    };
    //Private function to reset validation properties to hide invalid test from template
    PatientInsuranceComponent.prototype.resetValidationKeys = function () {
        this.valInsId = this.valInsPubId = this.valPatId = false;
    };
    //Private method to clear patient insurance data when a request is made.
    PatientInsuranceComponent.prototype.clearPatientInsuranceData = function () {
        this.patientInsuranceModel.InsuranceId = this.patientInsuranceModel.PatientId = 0;
        this.insId = this.patId = null;
        this.patientInsuranceModel.InsurancePublicId = this.insPubId = appSettings_1.AppSettings.Empty;
        this.resetValidationKeys();
    };
    //Private function set patient insurance model
    PatientInsuranceComponent.prototype.setPatientInsuranceModel = function () {
        this.patientInsuranceModel.InsuranceId = this.insId;
        this.patientInsuranceModel.PatientId = this.patId;
        this.patientInsuranceModel.InsurancePublicId = this.insPubId;
    };
    return PatientInsuranceComponent;
}());
__decorate([
    core_1.ViewChild('patientModal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], PatientInsuranceComponent.prototype, "patientModal", void 0);
__decorate([
    core_1.ViewChild('insuranceModal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], PatientInsuranceComponent.prototype, "insuranceModal", void 0);
__decorate([
    core_1.ViewChild('patientInsuranceModal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], PatientInsuranceComponent.prototype, "patientinsuranceModal", void 0);
PatientInsuranceComponent = __decorate([
    core_1.Component({
        selector: 'patientinsurance',
        templateUrl: '/Home/PatientInsurance'
    }),
    __metadata("design:paramtypes", [app_1.AppComponent, servers_service_1.ServerService, router_1.Router, commonFunctions_1.CommonFunctionService])
], PatientInsuranceComponent);
exports.PatientInsuranceComponent = PatientInsuranceComponent;
//# sourceMappingURL=patientinsurance.js.map