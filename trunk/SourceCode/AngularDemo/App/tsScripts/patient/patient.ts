//This is the patient component.

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';
import { AppComponent } from '../app';

@Component({
    selector: 'patient',
    templateUrl: '/Home/Patient'
})

export class PatientComponent {
    constructor(private serverService: ServerService, private appComponent: AppComponent, private router: Router) { }

    ngOnInit() {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
    }

    //The patient model that can be used in saving a new patient.
    private patientModel = {
        FirstName: AppSettings.Empty,
        MiddleName: AppSettings.Empty,
        LastName: AppSettings.Empty,
        Address: AppSettings.Empty,
        Gender: AppSettings.Empty,
        Age: AppSettings.Zero,
        PhoneNumber: AppSettings.Zero
    }

    //Private variables of the component.
    private patFirstName: string = AppSettings.Empty;
    private patMiddleName: string = AppSettings.Empty;
    private patLastName: string = AppSettings.Empty;
    private patAddress: string = AppSettings.Empty;
    private patGender: string = AppSettings.Empty;
    private patAge: number;
    private patPhone: number;
    private valFirstName: boolean = false;
    private valMiddleName: boolean = false;
    private valLastName: boolean = false;
    private valAddress: boolean = false;
    private valGender: boolean = false;
    private valPhone: boolean = false;

    //Private functions of the component.
    private savePatient() {
        this.setPatientModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.Patient, this.patientModel)
            .subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.clearPatientData();
                        alert(AppSettings.PatientAdded);
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

    private toggleGender(flag: number) {
        if (flag === 1)
            this.patGender = AppSettings.Male;
        else
            this.patGender = AppSettings.Female;
    }

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

    private resetValidationKeys() {
        this.valAddress = this.valFirstName = this.valGender = this.valLastName = this.valMiddleName = this.valPhone = false;
    }

    private clearPatientData() {
        this.patAddress = this.patFirstName = this.patMiddleName = this.patLastName = this.patGender = '';
        this.patAge = this.patPhone = null;
        this.resetValidationKeys();
    }

    private setPatientModel() {
        this.patientModel.FirstName = this.patFirstName;
        this.patientModel.MiddleName = this.patMiddleName;
        this.patientModel.LastName = this.patLastName;
        this.patientModel.Address = this.patAddress;
        this.patientModel.Gender = this.patGender;
        this.patientModel.Age = this.patAge;
        this.patientModel.PhoneNumber = this.patPhone;
    }
}