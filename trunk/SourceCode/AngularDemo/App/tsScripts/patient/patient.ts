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

    private patientModel = {
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Address: '',
        Gender: '',
        Age: 0,
        PhoneNumber: 0
    }

    private patFirstName: string = '';
    private patMiddleName: string = '';
    private patLastName: string = '';
    private patAddress: string = '';
    private patGender: string = '';
    private patAge: number ;
    private patPhone: number ;

    private valFirstName: boolean = false;
    private valMiddleName: boolean = false;
    private valLastName: boolean = false;
    private valAddress: boolean = false;
    private valGender: boolean = false;
    private valPhone: boolean = false;

    private savePatient() {
        this.setPatientModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.Patient, this.patientModel)
            .subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.clearPatientData();
                        alert('Patient added successfully.');
                    }
                    else {
                        this.setValidationFlagOn(body.data);
                    }
                } else {
                    alert(`Error ${response.status}`);
                }
            },
            (error) => {
                alert('Some error occured.');
            }
            );
    }

    private toggleGender(flag: number) {
        if (flag === 1)
            this.patGender = "Male";
        else
            this.patGender = "Female";
    }

    private setValidationFlagOn(key: string) {
        this.resetValidationKeys();
        switch (key) {
            case "FirstName": this.valFirstName = true;
                break;
            case "MiddleName": this.valMiddleName = true;
                break;
            case "LastName": this.valLastName = true;
                break;
            case "Address": this.valAddress = true;
                break;
            case "PhoneNumber": this.valPhone = true;
                break;
            case "Gender": this.valGender = true;
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