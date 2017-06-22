"use strict";
//This is the patient component.
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
var PatientComponent = (function () {
    function PatientComponent(serverService, appComponent, router) {
        this.serverService = serverService;
        this.appComponent = appComponent;
        this.router = router;
        //The patient model that can be used in saving a new patient.
        this.patientModel = {
            FirstName: '',
            MiddleName: '',
            LastName: '',
            Address: '',
            Gender: '',
            Age: 0,
            PhoneNumber: 0
        };
        //Private variables of the component.
        this.patFirstName = '';
        this.patMiddleName = '';
        this.patLastName = '';
        this.patAddress = '';
        this.patGender = '';
        this.valFirstName = false;
        this.valMiddleName = false;
        this.valLastName = false;
        this.valAddress = false;
        this.valGender = false;
        this.valPhone = false;
    }
    PatientComponent.prototype.ngOnInit = function () {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
    };
    //Private functions of the component.
    PatientComponent.prototype.savePatient = function () {
        var _this = this;
        this.setPatientModel();
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Patient, this.patientModel)
            .subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.clearPatientData();
                    alert('Patient added successfully.');
                }
                else {
                    _this.setValidationFlagOn(body.data);
                }
            }
            else {
                alert("Error " + response.status);
            }
        }, function (error) {
            alert('Some error occured.');
        });
    };
    PatientComponent.prototype.toggleGender = function (flag) {
        if (flag === 1)
            this.patGender = "Male";
        else
            this.patGender = "Female";
    };
    PatientComponent.prototype.setValidationFlagOn = function (key) {
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
            case "Address":
                this.valAddress = true;
                break;
            case "PhoneNumber":
                this.valPhone = true;
                break;
            case "Gender":
                this.valGender = true;
                break;
        }
    };
    PatientComponent.prototype.resetValidationKeys = function () {
        this.valAddress = this.valFirstName = this.valGender = this.valLastName = this.valMiddleName = this.valPhone = false;
    };
    PatientComponent.prototype.clearPatientData = function () {
        this.patAddress = this.patFirstName = this.patMiddleName = this.patLastName = this.patGender = '';
        this.patAge = this.patPhone = null;
        this.resetValidationKeys();
    };
    PatientComponent.prototype.setPatientModel = function () {
        this.patientModel.FirstName = this.patFirstName;
        this.patientModel.MiddleName = this.patMiddleName;
        this.patientModel.LastName = this.patLastName;
        this.patientModel.Address = this.patAddress;
        this.patientModel.Gender = this.patGender;
        this.patientModel.Age = this.patAge;
        this.patientModel.PhoneNumber = this.patPhone;
    };
    return PatientComponent;
}());
PatientComponent = __decorate([
    core_1.Component({
        selector: 'patient',
        templateUrl: '/Home/Patient'
    }),
    __metadata("design:paramtypes", [servers_service_1.ServerService, app_1.AppComponent, router_1.Router])
], PatientComponent);
exports.PatientComponent = PatientComponent;
//# sourceMappingURL=patient.js.map