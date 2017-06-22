//This is the insurance component.

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

    //Insurance model to add/save a new insurance.
    private insuranceModel = {
        Name: '',
        Address: '',
        PhoneNumber: 0,
        InsurancePublicId: ''
    }

    //Private variables of component.
    private insName: string = AppSettings.Empty;
    private insPhone: number;
    private insAddress: string = AppSettings.Empty;
    private insPublicId: string = AppSettings.Empty;
    private valName: boolean = false;
    private valPhone: boolean = false;
    private valAddress: boolean = false;
    private valPublicId: boolean = false;

    //Private functions of component.
    private saveInsurance() {
        this.setInsuranceModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.Insurance, this.insuranceModel).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.clearInsuranceData();
                        alert(AppSettings.InsuranceAdded);
                    }
                    else {
                        this.setValidationFlagOn(body.data);
                    }
                } else {
                    alert(`${AppSettings.Error, response.status}`);
                }
            },
            (error) => {
                console.log(AppSettings.SomeErrorOccured);
            }
        );
    }

    private setValidationFlagOn(key: string) {
        this.resetValidationKeys();
        switch (key) {
            case AppSettings.Name: this.valName = true;
                break;
            case AppSettings.Address: this.valAddress = true;
                break;
            case AppSettings.PhoneNumber: this.valPhone = true;
                break;
            case AppSettings.InsurancePublicId: this.valPublicId = true;
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
        this.insAddress = this.insPublicId = this.insName = AppSettings.Empty;
        this.insPhone = null;
        this.resetValidationKeys();
    }
}