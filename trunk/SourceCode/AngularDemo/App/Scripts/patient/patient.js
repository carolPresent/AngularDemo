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
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var servers_service_1 = require("../servers.service");
var appSettings_1 = require("../appSettings");
var app_1 = require("../app");
var commonFunctions_1 = require("../server/commonFunctions");
var PatientComponent = (function () {
    function PatientComponent(serverService, appComponent, router, commonFunctions) {
        this.serverService = serverService;
        this.appComponent = appComponent;
        this.router = router;
        this.commonFunctions = commonFunctions;
        //Private variables of the component.
        this.patFirstName = appSettings_1.AppSettings.Empty;
        this.patMiddleName = appSettings_1.AppSettings.Empty;
        this.patLastName = appSettings_1.AppSettings.Empty;
        this.patAddress = appSettings_1.AppSettings.Empty;
        this.patGender = appSettings_1.AppSettings.Empty;
        this.patEmail = appSettings_1.AppSettings.Empty;
        this.valFirstName = false;
        this.valMiddleName = false;
        this.valLastName = false;
        this.valAddress = false;
        this.valGender = false;
        this.valPhone = false;
        this.valEmailId = false;
        this.valAge = false;
        this.patientList = [];
        this.patientModalSaveButtonValue = appSettings_1.AppSettings.Save;
        this.addPateintModalTitle = appSettings_1.AppSettings.NewPatient;
        this.isMale = false;
        this.isFemale = false;
        //The patient model that can be used in saving a new patient.
        this.patientModel = {
            FirstName: this.patFirstName,
            MiddleName: this.patMiddleName,
            LastName: this.patLastName,
            Address: this.patAddress,
            Gender: this.patGender,
            Age: this.patAge,
            PhoneNumber: this.patPhone,
            EmailId: this.patEmail,
            Id: 0
        };
    }
    PatientComponent.prototype.ngOnInit = function () {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
        this.fetchPatientList();
    };
    //Private method to fetch patient list. Calls the common function service.
    PatientComponent.prototype.fetchPatientList = function () {
        var _this = this;
        this.commonFunctions.getPatientList(function (data) {
            _this.patientList = data;
        });
    };
    //Private function to save patient by sending HTTP AJAX request.
    PatientComponent.prototype.savePatient = function () {
        var _this = this;
        if (!this.validateVariables())
            return;
        if (this.patientModalSaveButtonValue === appSettings_1.AppSettings.Modify) {
            this.sendPatientEditRequest();
            return;
        }
        this.setPatientModel();
        this.serverService.postRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Patient, this.patientModel)
            .subscribe(function (response) {
            if (response.status === appSettings_1.AppSettings.OkStatusCode) {
                var body = response.json();
                if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                    _this.clearPatientData();
                    alert(appSettings_1.AppSettings.PatientAdded);
                    _this.fetchPatientList();
                    _this.togglePatientModal(false);
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
    //Private method to toggle add patient modal on view
    PatientComponent.prototype.togglePatientModal = function (bit) {
        this.resetValidationKeys();
        if (bit)
            this.addPatientModal.open();
        else
            this.addPatientModal.close();
        this.clearEditFormData();
    };
    //Private function to validate variables of patient to send in the put request
    PatientComponent.prototype.validateVariables = function () {
        this.resetValidationKeys();
        var returnItem = true;
        if (this.patFirstName.length === 0 || this.patFirstName.length > 40) {
            returnItem = false;
            this.valFirstName = true;
        }
        if (this.patMiddleName.length > 40) {
            returnItem = false;
            this.valMiddleName = true;
        }
        if (this.patLastName.length === 0 || this.patLastName.length > 40) {
            returnItem = false;
            this.valLastName = true;
        }
        if (this.patAddress.length === 0 || this.patAddress.length > 990) {
            returnItem = false;
            this.valAddress = true;
        }
        if (this.patAge == null || this.patAge > 125) {
            returnItem = false;
            this.valAge = true;
        }
        if (this.patGender != appSettings_1.AppSettings.Female && this.patGender != appSettings_1.AppSettings.Male) {
            returnItem = false;
            this.valGender = true;
        }
        if (this.patPhone == null || this.patPhone < 1e9 || this.patPhone >= 1e10) {
            returnItem = false;
            this.valPhone = true;
        }
        if (!appSettings_1.AppSettings.validateEmail(this.patEmail)) {
            returnItem = false;
            this.valEmailId = true;
        }
        return returnItem;
    };
    //Private function to concatenate first name and last name and return it.
    PatientComponent.prototype.concatNames = function (firstName, lastName) {
        return firstName + appSettings_1.AppSettings.Space + lastName;
    };
    //Private function that toggles gender properties whenever 'gender' radio is clicked.
    PatientComponent.prototype.toggleGender = function (flag) {
        if (flag === 1)
            this.patGender = appSettings_1.AppSettings.Male;
        else
            this.patGender = appSettings_1.AppSettings.Female;
    };
    //Private function that sets up basic settings to show on view in case when user is modifying an old patient data
    PatientComponent.prototype.editPatient = function (patient) {
        this.addPatientModal.open();
        this.patFirstName = patient.FirstName;
        this.patMiddleName = patient.MiddleName;
        this.patLastName = patient.LastName;
        this.patAddress = patient.Address;
        this.patPhone = patient.PhoneNumber;
        this.patEmail = patient.EmailId;
        this.patGender = patient.Gender;
        this.patAge = patient.Age;
        this.patientModel.Id = patient.Id;
        this.addPateintModalTitle = appSettings_1.AppSettings.ModifyPatient;
        this.patientModalSaveButtonValue = appSettings_1.AppSettings.Modify;
        this.checkGenderRadioOnPatientEdit();
    };
    //Private method to make a put request to madify a patient's data.
    PatientComponent.prototype.sendPatientEditRequest = function () {
        var _this = this;
        this.setPatientModel();
        this.serverService.putRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Patient, this.patientModel).subscribe(function (response) {
            var body = response.json();
            if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                alert(appSettings_1.AppSettings.PatientUpdated);
                _this.fetchPatientList();
            }
            else {
                if (body.data === appSettings_1.AppSettings.Unauthorized)
                    alert(appSettings_1.AppSettings.UnauthorizedPatienEdit);
            }
        }, function (error) {
            alert(appSettings_1.AppSettings.SomeErrorOccured);
        });
        this.clearEditFormData();
        this.addPatientModal.close();
    };
    //Private function to clear edit form data for patient
    PatientComponent.prototype.clearEditFormData = function () {
        this.isMale = this.isFemale = false;
        this.addPateintModalTitle = appSettings_1.AppSettings.NewPatient;
        this.patientModalSaveButtonValue = appSettings_1.AppSettings.Save;
        this.clearPatientData();
    };
    //Private function which checks/unchecks male/femal radio buttons on view in case of patient edit
    PatientComponent.prototype.checkGenderRadioOnPatientEdit = function () {
        this.isMale = this.isFemale = false;
        if (this.patGender === appSettings_1.AppSettings.Male)
            this.isMale = true;
        else
            this.isFemale = true;
    };
    //Private function to set validation flag associated to the ApiKey returned in case of bad request.
    PatientComponent.prototype.setValidationFlagOn = function (key) {
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
            case appSettings_1.AppSettings.Address:
                this.valAddress = true;
                break;
            case appSettings_1.AppSettings.PhoneNumber:
                this.valPhone = true;
                break;
            case appSettings_1.AppSettings.Gender:
                this.valGender = true;
                break;
        }
    };
    //Private function to reset validation properties from template.
    PatientComponent.prototype.resetValidationKeys = function () {
        this.valAddress = this.valFirstName = this.valEmailId = this.valGender = this.valLastName = this.valMiddleName = this.valPhone = this.valAge = false;
    };
    //Private function to clear patient properties from template.
    PatientComponent.prototype.clearPatientData = function () {
        this.patAddress = this.patFirstName = this.patMiddleName = this.patLastName = this.patGender = this.patEmail = appSettings_1.AppSettings.Empty;
        this.patAge = this.patPhone = null;
        this.resetValidationKeys();
    };
    //Private function to set patient model bounded with view elements.
    PatientComponent.prototype.setPatientModel = function () {
        this.patientModel.Address = this.patAddress;
        this.patientModel.Age = this.patAge;
        this.patientModel.EmailId = this.patEmail;
        this.patientModel.FirstName = this.patFirstName;
        this.patientModel.MiddleName = this.patMiddleName;
        this.patientModel.Gender = this.patGender;
        this.patientModel.LastName = this.patLastName;
        this.patientModel.PhoneNumber = this.patPhone;
    };
    return PatientComponent;
}());
__decorate([
    core_1.ViewChild('addPatient'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], PatientComponent.prototype, "addPatientModal", void 0);
PatientComponent = __decorate([
    core_1.Component({
        selector: 'patient',
        templateUrl: '/Home/Patient'
    }),
    __metadata("design:paramtypes", [servers_service_1.ServerService, app_1.AppComponent, router_1.Router, commonFunctions_1.CommonFunctionService])
], PatientComponent);
exports.PatientComponent = PatientComponent;
//# sourceMappingURL=patient.js.map