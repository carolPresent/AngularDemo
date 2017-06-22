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
var PatientInsuranceComponent = (function () {
    function PatientInsuranceComponent(appComponent, serverService, router) {
        this.appComponent = appComponent;
        this.serverService = serverService;
        this.router = router;
        //The patient insurance model
        this.patientInsuranceModel = {
            PatientId: 0,
            InsuranceId: 0,
            InsurancePublicId: appSettings_1.AppSettings.Empty
        };
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
    }
    PatientInsuranceComponent.prototype.ngOnInit = function () {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
    };
    //Private functions used in component.
    PatientInsuranceComponent.prototype.savePatientInsurance = function () {
        var _this = this;
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
    PatientInsuranceComponent.prototype.getPatientList = function () {
        var _this = this;
        this.serverService.getRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Patient).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.patientList = JSON.parse(body.data);
                    _this.currentPatList = _this.patientList;
                }
                else {
                    alert("" + (appSettings_1.AppSettings.Patient, appSettings_1.AppSettings.ListCouldNotLoad));
                }
            }
            else {
                alert(appSettings_1.AppSettings.Error + " " + response.status);
            }
        }, function (error) {
            alert(appSettings_1.AppSettings.SomeErrorOccured);
        });
    };
    PatientInsuranceComponent.prototype.getInsuranceList = function () {
        var _this = this;
        this.serverService.getRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Insurance).subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.insuranceList = JSON.parse(body.data);
                    _this.currentInsList = _this.insuranceList;
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
    PatientInsuranceComponent.prototype.filterPatientList = function () {
        var _this = this;
        this.currentPatList = this.patientList.filter(function (patient) {
            return patient.FirstName.toLowerCase().includes(_this.searchPatient) || patient.PhoneNumber.includes(_this.searchPatient)
                || patient.Address.toLowerCase().includes(_this.searchPatient);
        });
    };
    PatientInsuranceComponent.prototype.filterInsuranceList = function () {
        var _this = this;
        this.currentInsList = this.insuranceList.filter(function (insurance) {
            return insurance.Name.toLowerCase().includes(_this.searchInsurance) || insurance.InsurancePublicId.includes(_this.searchInsurance);
        });
    };
    PatientInsuranceComponent.prototype.filterPatientInsuranceList = function () {
        var _this = this;
        this.currentPatInsList = this.patientInsuranceList.filter(function (patientInsurance) {
            var patientInfo = patientInsurance.PatientInfo;
            var insuranceInfo = patientInsurance.InsuranceInfo;
            return patientInfo.FirstName.toLowerCase().includes(_this.searchPatientInsurance) || patientInfo.Address.includes(_this.searchPatientInsurance) ||
                insuranceInfo.Name.toLowerCase().includes(_this.searchPatientInsurance) || insuranceInfo.InsurancePublicId.includes(_this.searchPatientInsurance);
        });
    };
    PatientInsuranceComponent.prototype.openPatientModal = function () {
        this.currentPatList = this.patientList;
        this.getPatientList();
        this.patientModal.open();
    };
    PatientInsuranceComponent.prototype.openInsuranceModal = function () {
        this.currentInsList = this.insuranceList;
        this.getInsuranceList();
        this.insuranceModal.open();
    };
    PatientInsuranceComponent.prototype.openPatientInsuranceModal = function () {
        this.currentPatInsList = this.patientInsuranceList;
        this.getPatientInsuranceList();
        this.patientinsuranceModal.open();
    };
    PatientInsuranceComponent.prototype.selectPatient = function (patientId) {
        this.resetValidationKeys();
        this.patId = patientId;
        this.patientModal.close();
    };
    PatientInsuranceComponent.prototype.selectInsurance = function (insuranceId, insurancePublicId) {
        this.resetValidationKeys();
        this.insId = insuranceId;
        this.insPubId = insurancePublicId;
        this.insuranceModal.close();
    };
    PatientInsuranceComponent.prototype.selectPatientInsurance = function (patientInfo, insuranceInfo) {
        this.resetValidationKeys();
        this.patId = patientInfo.Id;
        this.insId = insuranceInfo.Id;
        this.insPubId = insuranceInfo.InsurancePublicId;
        this.patientinsuranceModal.close();
    };
    PatientInsuranceComponent.prototype.concatNames = function (firstName, lastName) {
        return firstName + appSettings_1.AppSettings.Space + lastName;
    };
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
    PatientInsuranceComponent.prototype.resetValidationKeys = function () {
        this.valInsId = this.valInsPubId = this.valPatId = false;
    };
    PatientInsuranceComponent.prototype.setPatientInsuranceModel = function () {
        this.patientInsuranceModel.InsuranceId = this.insId;
        this.patientInsuranceModel.InsurancePublicId = this.insPubId;
        this.patientInsuranceModel.PatientId = this.patId;
    };
    PatientInsuranceComponent.prototype.clearPatientInsuranceData = function () {
        this.patientInsuranceModel.InsuranceId = this.patientInsuranceModel.PatientId = 0;
        this.insId = this.patId = null;
        this.patientInsuranceModel.InsurancePublicId = this.insPubId = appSettings_1.AppSettings.Empty;
        this.resetValidationKeys();
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
    __metadata("design:paramtypes", [app_1.AppComponent, servers_service_1.ServerService, router_1.Router])
], PatientInsuranceComponent);
exports.PatientInsuranceComponent = PatientInsuranceComponent;
//# sourceMappingURL=patientinsurance.js.map