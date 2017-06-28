//This is the insurance component.

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';
import { AppComponent } from '../app';
import { CommonFunctionService } from '../server/commonFunctions';

@Component({
    selector: 'insurance',
    templateUrl: '/Home/Insurance'
})

export class InsuranceComponent {
    constructor(private serverService: ServerService, private appComponent: AppComponent, private router: Router, private commonFunctions: CommonFunctionService) { }

    ngOnInit() {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
        this.fetchInsuranceList();
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
    private insuranceList: any = [];
    private insuranceModalSaveButtonValue: string = AppSettings.Save;
    private addInsuranceModalTitle: string = AppSettings.NewInsurance;

    @ViewChild('addInsurance')
    private addInsuranceModal: ModalComponent;

    //Insurance model to add/save a new insurance.
    private insuranceModel = {
        Name: this.insName,
        Address: this.insAddress,
        PhoneNumber: this.insPhone,
        InsurancePublicId: this.insPublicId,
        Id: 0
    }

    //Private function to save insurance. Send a request Server.Service to interact with HTTP.
    private saveInsurance() {
        if (!this.validateVariables())
            return;
        if (this.insuranceModalSaveButtonValue === AppSettings.Modify) {
            this.sendInsuranceEditRequest();
            return;
        }
        this.setInsuranceModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.Insurance, this.insuranceModel).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.clearInsuranceData();
                        alert(AppSettings.InsuranceAdded);
                        this.fetchInsuranceList();
                        this.toggleInsuranceModal(false);
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

    //Private function to validate variables on view in case of put request to insurance
    private validateVariables() {
        this.resetValidationKeys();
        let returnItem: boolean = true;
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
    }

    //Private method to set basic settings on view for better user experience.
    private editInsurance(insurance) {
        this.addInsuranceModal.open();
        this.insName = insurance.Name;
        this.insAddress = insurance.Address;
        this.insPhone = insurance.PhoneNumber;
        this.insPublicId = insurance.InsurancePublicId;
        this.insuranceModel.Id = insurance.Id;
        this.addInsuranceModalTitle = AppSettings.ModifyInsurance;
        this.insuranceModalSaveButtonValue = AppSettings.Modify;
    }

    //Private method to send a put request to modify insurance data
    private sendInsuranceEditRequest() {
        this.setInsuranceModel();
        this.serverService.putRequest(AppSettings.API_END_POINT + AppSettings.Insurance, this.insuranceModel).subscribe(
            (response) => {
                var body = response.json();
                if (body.status === AppSettings.SuccessStatus) {
                    alert(AppSettings.InsuranceUpdated);
                    this.fetchInsuranceList();
                } else {
                    if (body.data === AppSettings.Unauthorized)
                        alert(AppSettings.UnauthorizedInsuranceEdit);
                }
            },
            (error) => {
                alert(AppSettings.SomeErrorOccured);
            }
        )
        this.clearEditFormData();
        this.addInsuranceModal.close();
    }

    //Private method to clear edit form data.
    private clearEditFormData() {
        this.addInsuranceModalTitle = AppSettings.NewInsurance;
        this.insuranceModalSaveButtonValue = AppSettings.Save;
        this.clearInsuranceData();
    }

    //Private method to fetch insurance list by common function service
    private fetchInsuranceList() {
        this.commonFunctions.getInsuranceList((data) => {
            this.insuranceList = data;
        });
    }

    //Private function to set validation flag associated to the ApiKey returned in case of bad request.
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

    //Private function to toggle open/close for add insurance modal
    private toggleInsuranceModal(bit: boolean) {
        this.resetValidationKeys();
        this.clearEditFormData();
        if (bit)
            this.addInsuranceModal.open();
        else
            this.addInsuranceModal.close();
    }

    //Private function to reset validation properties from template.
    private resetValidationKeys() {
        this.valAddress = this.valName = this.valPhone = this.valPublicId = false;
    }

    //Private function to clear insurance properties and insurance model.
    private clearInsuranceData() {
        this.insAddress = this.insPublicId = this.insName = AppSettings.Empty;
        this.insPhone = null;
        this.resetValidationKeys();
    }

    //Private method to set insurance model bounded to view input elements.
    private setInsuranceModel() {
        this.insuranceModel.Address = this.insAddress;
        this.insuranceModel.InsurancePublicId = this.insPublicId;
        this.insuranceModel.Name = this.insName;
        this.insuranceModel.PhoneNumber = this.insPhone;
    }
}