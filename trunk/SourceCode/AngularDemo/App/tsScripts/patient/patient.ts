//This is the patient component.

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';
import { AppComponent } from '../app';
import { CommonFunctionService } from '../server/commonFunctions';

@Component({
    selector: 'patient',
    templateUrl: '/Home/Patient'
})

export class PatientComponent {
    constructor(private serverService: ServerService, private appComponent: AppComponent, private router: Router, private commonFunctions: CommonFunctionService) { }

    ngOnInit() {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
        this.fetchPatientList();
    }

    //Private variables of the component.
    private patFirstName: string = AppSettings.Empty;
    private patMiddleName: string = AppSettings.Empty;
    private patLastName: string = AppSettings.Empty;
    private patAddress: string = AppSettings.Empty;
    private patGender: string = AppSettings.Empty;
    private patAge: number;
    private patPhone: number;
    private patEmail: string = AppSettings.Empty;
    private valFirstName: boolean = false;
    private valMiddleName: boolean = false;
    private valLastName: boolean = false;
    private valAddress: boolean = false;
    private valGender: boolean = false;
    private valPhone: boolean = false;
    private valEmailId: boolean = false;
    private valAge: boolean = false;
    private patientList: any = [];
    private patientModalSaveButtonValue: string = AppSettings.Save;
    private addPateintModalTitle: string = AppSettings.NewPatient;
    private isMale: boolean = false;
    private isFemale: boolean = false;

    @ViewChild('addPatient')
    private addPatientModal: ModalComponent;

    //The patient model that can be used in saving a new patient.
    private patientModel = {
        FirstName: this.patFirstName,
        MiddleName: this.patMiddleName,
        LastName: this.patLastName,
        Address: this.patAddress,
        Gender: this.patGender,
        Age: this.patAge,
        PhoneNumber: this.patPhone,
        EmailId: this.patEmail,
        Id: 0
    }

    //Private method to fetch patient list. Calls the common function service.
    private fetchPatientList() {
        this.commonFunctions.getPatientList((data) => {
            this.patientList = data;
        });
    }

    //Private function to save patient by sending HTTP AJAX request.
    private savePatient() {
        if (!this.validateVariables())
            return;
        if (this.patientModalSaveButtonValue === AppSettings.Modify) {
            this.sendPatientEditRequest();
            return;
        }
        this.setPatientModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.Patient, this.patientModel)
            .subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.clearPatientData();
                        alert(AppSettings.PatientAdded);
                        this.fetchPatientList();
                        this.togglePatientModal(false);
                    }
                    else {
                        this.setValidationFlagOn(body.data);
                    }
                } else {
                    alert(`${AppSettings.Error} ${response.status}`);
                }
            },
            (error) => {
                alert(AppSettings.SomeErrorOccured);
            }
            );
    }

    //Private method to toggle add patient modal on view
    private togglePatientModal(bit: boolean) {
        this.resetValidationKeys();
        if (bit)
            this.addPatientModal.open();
        else
            this.addPatientModal.close();
        this.clearEditFormData();
    }

    //Private function to validate variables of patient to send in the put request
    private validateVariables() {
        this.resetValidationKeys();
        let returnItem: boolean = true;
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
        if (this.patGender != AppSettings.Female && this.patGender != AppSettings.Male) {
            returnItem = false;
            this.valGender = true;
        }
        if (this.patPhone == null || this.patPhone < 1e9 || this.patPhone >= 1e10) {
            returnItem = false;
            this.valPhone = true;
        }
        if (!AppSettings.validateEmail(this.patEmail)) {
            returnItem = false;
            this.valEmailId = true;
        }
        return returnItem;
    }

    //Private function to concatenate first name and last name and return it.
    private concatNames(firstName: string, lastName: string) {
        return firstName + AppSettings.Space + lastName;
    }

    //Private function that toggles gender properties whenever 'gender' radio is clicked.
    private toggleGender(flag: number) {
        if (flag === 1)
            this.patGender = AppSettings.Male;
        else
            this.patGender = AppSettings.Female;
    }

    //Private function that sets up basic settings to show on view in case when user is modifying an old patient data
    private editPatient(patient: any) {
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
        this.addPateintModalTitle = AppSettings.ModifyPatient;
        this.patientModalSaveButtonValue = AppSettings.Modify;
        this.checkGenderRadioOnPatientEdit();
    }

    //Private method to make a put request to madify a patient's data.
    private sendPatientEditRequest() {
        this.setPatientModel();
        this.serverService.putRequest(AppSettings.API_END_POINT + AppSettings.Patient, this.patientModel).subscribe(
            (response) => {
                var body = response.json();
                if (body.status === AppSettings.SuccessStatus) {
                    alert(AppSettings.PatientUpdated);
                    this.fetchPatientList();
                } else {
                    if (body.data === AppSettings.Unauthorized)
                        alert(AppSettings.UnauthorizedPatienEdit);
                }
            },
            (error) => {
                alert(AppSettings.SomeErrorOccured);
            }
        )
        this.clearEditFormData();
        this.addPatientModal.close();
    }

    //Private function to clear edit form data for patient
    private clearEditFormData() {
        this.isMale = this.isFemale = false;
        this.addPateintModalTitle = AppSettings.NewPatient;
        this.patientModalSaveButtonValue = AppSettings.Save;
        this.clearPatientData();
    }

    //Private function which checks/unchecks male/femal radio buttons on view in case of patient edit
    private checkGenderRadioOnPatientEdit() {
        this.isMale = this.isFemale = false;
        if (this.patGender === AppSettings.Male)
            this.isMale = true;
        else
            this.isFemale = true;

    }

    //Private function to set validation flag associated to the ApiKey returned in case of bad request.
    private setValidationFlagOn(key: string) {
        this.resetValidationKeys();
        switch (key) {
            case AppSettings.FirstName: this.valFirstName = true;
                break;
            case AppSettings.MiddleName: this.valMiddleName = true;
                break;
            case AppSettings.LastName: this.valLastName = true;
                break;
            case AppSettings.Address: this.valAddress = true;
                break;
            case AppSettings.PhoneNumber: this.valPhone = true;
                break;
            case AppSettings.Gender: this.valGender = true;
                break;
        }
    }

    //Private function to reset validation properties from template.
    private resetValidationKeys() {
        this.valAddress = this.valFirstName = this.valEmailId = this.valGender = this.valLastName = this.valMiddleName = this.valPhone = this.valAge = false;
    }

    //Private function to clear patient properties from template.
    private clearPatientData() {
        this.patAddress = this.patFirstName = this.patMiddleName = this.patLastName = this.patGender = this.patEmail = AppSettings.Empty;
        this.patAge = this.patPhone = null;
        this.resetValidationKeys();
    }

    //Private function to set patient model bounded with view elements.
    private setPatientModel() {
        this.patientModel.Address = this.patAddress;
        this.patientModel.Age = this.patAge;
        this.patientModel.EmailId = this.patEmail;
        this.patientModel.FirstName = this.patFirstName;
        this.patientModel.MiddleName = this.patMiddleName;
        this.patientModel.Gender = this.patGender;
        this.patientModel.LastName = this.patLastName;
        this.patientModel.PhoneNumber = this.patPhone;
    }
}