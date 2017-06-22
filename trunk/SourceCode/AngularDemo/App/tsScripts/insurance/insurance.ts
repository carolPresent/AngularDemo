import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';
import { AppComponent } from '../app';

@Component({
    selector: 'insurance',
    templateUrl: '/Home/Insurance'
})

export class InsuranceComponent {
    constructor(private serverService: ServerService, private appComponent: AppComponent, private router: Router) { }

    ngOnInit() {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
    }

    private insuranceModel = {
        Name: '',
        Address: '',
        PhoneNumber: 0,
        InsurancePublicId: ''
    }

    private insName: string = '';
    private insPhone: number;
    private insAddress: string = '';
    private insPublicId: string = '';

    private valName: boolean = false;
    private valPhone: boolean = false;
    private valAddress: boolean = false;
    private valPublicId: boolean = false;

    private saveInsurance() {
        this.setInsuranceModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.Insurance, this.insuranceModel).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.clearInsuranceData();
                        alert('Insurance added successfully.');
                    }
                    else {
                        this.setValidationFlagOn(body.data);
                    }
                }
            },
            (error) => {
                console.log('Some error occured.');
            }
        );
    }

    private setValidationFlagOn(key: string) {
        this.resetValidationKeys();
        switch (key) {
            case "Name": this.valName = true;
                break;
            case "Address": this.valAddress = true;
                break;
            case "PhoneNumber": this.valPhone = true;
                break;
            case "InsurancePublicId": this.valPublicId = true;
                break;
        }
    }

    private resetValidationKeys() {
        this.valAddress = this.valName = this.valPhone = this.valPublicId = false;
    }

    private setInsuranceModel() {
        this.insuranceModel.Address = this.insAddress;
        this.insuranceModel.Name = this.insName;
        this.insuranceModel.PhoneNumber = this.insPhone;
        this.insuranceModel.InsurancePublicId = this.insPublicId;
    }

    private clearInsuranceData() {
        this.insAddress = this.insPublicId = this.insName = '';
        this.insPhone = null;
        this.resetValidationKeys();
    }
}