//This is the patient insurance component.

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from '../app';
import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';
import { CommonFunctionService } from '../server/commonFunctions';

@Component({
    selector: 'patientinsurance',
    templateUrl: '/Home/PatientInsurance'
})

export class PatientInsuranceComponent {
    constructor(private appComponent: AppComponent, private serverService: ServerService, private router: Router, private commonFunctions: CommonFunctionService) { }

    ngOnInit() {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
    }
    //Viewchild is the angular core component which can be used in getting angular modals on template.
    @ViewChild('patientModal')
    private patientModal: ModalComponent;

    @ViewChild('insuranceModal')
    private insuranceModal: ModalComponent;

    @ViewChild('patientInsuranceModal')
    private patientinsuranceModal: ModalComponent;

    //Private variables used in component.
    private patId: number;
    private insId: number;
    private insPubId: string = AppSettings.Empty;
    private patientList: any = [];
    private insuranceList: any = [];
    private patientInsuranceList: any = [];
    private searchPatient: string = AppSettings.Empty;
    private searchInsurance: string = AppSettings.Empty;
    private searchPatientInsurance: string = AppSettings.Empty;
    private currentPatList: any[];
    private currentInsList: any[];
    private currentPatInsList: any[];
    private valPatId: boolean = false;
    private valInsId: boolean = false;
    private valInsPubId: boolean = false;
    private buttonNameForPatientInsuranceSave: string = AppSettings.Save;

    //The patient insurance model
    private patientInsuranceModel = {
        PatientId: this.patId,
        InsuranceId: this.insId,
        InsurancePublicId: this.insPubId,
        Id:0
    }

    //Private function to save patient insurance by sending AJAX using Server.Service component.
    private savePatientInsurance() {
        if (!this.validateVariable())
            return;
        if (this.buttonNameForPatientInsuranceSave === AppSettings.Modify) {
            this.sendEditPatientInsuranceRequest();
            return;
        }
        this.setPatientInsuranceModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.PatientInsurance, this.patientInsuranceModel).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status == AppSettings.SuccessStatus) {
                        this.clearPatientInsuranceData();
                        alert(AppSettings.PatientInsuranceAdded);
                    }
                    else {
                        this.setValidationFlagOn(body.data);
                    }
                }
                else {
                    alert(`${AppSettings.Error} ${response.status}`);
                }
            },
            (error) => {
                alert(AppSettings.SomeErrorOccured)
            }
        )
    }

    //Private function to validate patient insurance variables.
    private validateVariable() {
        let returnItem: boolean = true;
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
    }

    //Private function to get a list of patient insurance from backend
    private getPatientInsuranceList() {
        this.serverService.getRequest(AppSettings.API_END_POINT + AppSettings.PatientInsurance).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.patientInsuranceList = JSON.parse(body.data);
                        this.currentPatInsList = this.patientInsuranceList;
                    } else {
                        alert(`${AppSettings.Insurance, AppSettings.ListCouldNotLoad}`);
                    }
                } else {
                    alert(`${AppSettings.Error} ${response.status}`);
                }
            },
            (error) => {
                alert(AppSettings.SomeErrorOccured)
            }
        )
    }

    //Private method to send a put request to modify patient insurance data
    private sendEditPatientInsuranceRequest() {
        this.setPatientInsuranceModel();
        this.serverService.putRequest(AppSettings.API_END_POINT + AppSettings.PatientInsurance, this.patientInsuranceModel).subscribe(
            (response) => {
                var body = response.json();
                if (body.status === AppSettings.SuccessStatus) {
                    alert(AppSettings.PatientInsuranceUpdated);
                } else {
                    if (body.data === AppSettings.Unauthorized)
                        alert(AppSettings.UnauthorizedPatienEdit);
                }
            },
            (error) => {
                alert(AppSettings.SomeErrorOccured);
            }
        )
        this.buttonNameForPatientInsuranceSave = AppSettings.Save;
        this.clearPatientInsuranceData();
        this.patientinsuranceModal.close();
    }

    //Private function to filter patient list based on user input. Filter by FirstName/PhoneNumber/Address
    private filterPatientList() {
        this.currentPatList = this.patientList.filter((patient) => {
            return patient.FirstName.toLowerCase().includes(this.searchPatient) || patient.PhoneNumber.includes(this.searchPatient)
                || patient.Address.toLowerCase().includes(this.searchPatient);
        });
    }

    //Private function to filter insurance list based on user input. Filter by NAme/InsurancePublicId
    private filterInsuranceList() {
        this.currentInsList = this.insuranceList.filter((insurance) => {
            return insurance.Name.toLowerCase().includes(this.searchInsurance) || insurance.InsurancePublicId.includes(this.searchInsurance);
        });
    }

    //Private function to filter patient insurance list based on user input. Filter by patient FirstName, paitent Address, insruance Name and insurance InsurancePublicId
    private filterPatientInsuranceList() {
        this.currentPatInsList = this.patientInsuranceList.filter((patientInsurance) => {
            var patientInfo = patientInsurance.PatientInfo;
            var insuranceInfo = patientInsurance.InsuranceInfo;
            return patientInfo.FirstName.toLowerCase().includes(this.searchPatientInsurance) || patientInfo.Address.includes(this.searchPatientInsurance) ||
                insuranceInfo.Name.toLowerCase().includes(this.searchPatientInsurance) || insuranceInfo.InsurancePublicId.includes(this.searchPatientInsurance);
        });
    }

    //Private function to open patient Modal to show list of patient.
    private openPatientModal() {
        this.commonFunctions.getPatientList((data) => {
            this.patientList = this.currentPatList = data;
        });
        this.patientModal.open();
    }

    //Private function to open insurance modal to show list of insurances.
    private openInsuranceModal() {
        this.commonFunctions.getInsuranceList((data) => {
            this.insuranceList = this.currentInsList = data;
        });
        this.insuranceModal.open();
    }

    //Private function to open patient insurance modal to show list of patient insurances.
    private openPatientInsuranceModal() {
        this.currentPatInsList = this.patientInsuranceList;
        this.getPatientInsuranceList();
        this.patientinsuranceModal.open();
    }

    //Private function to select patient when user click on a patient name in the user modal to select some patient.
    private selectPatient(patientId: number) {
        this.resetValidationKeys();
        this.patId = patientId;
        this.patientModal.close();
    }

    //Private function to select insurance when user click on a insurance name in the user modal to select some insurance.
    private selectInsurance(insuranceId: number, insurancePublicId: string) {
        this.resetValidationKeys();
        this.insId = insuranceId;
        this.insPubId = insurancePublicId;
        this.insuranceModal.close();
    }

    //Private function to select patient insurance when user click on a patient name in the user modal to select some patient insurance.
    private selectPatientInsurance(patientInfo: any, insuranceInfo: any, patientInsuranceId: number) {
        this.resetValidationKeys();
        this.patId = patientInfo.Id;
        this.insId = insuranceInfo.Id;
        this.insPubId = insuranceInfo.InsurancePublicId;
        this.patientInsuranceModel.Id = patientInsuranceId;
        this.patientinsuranceModal.close();
        this.buttonNameForPatientInsuranceSave = AppSettings.Modify;
    }

    //Private function to concatenate first name and last name and return it.
    private concatNames(firstName: string, lastName: string) {
        return firstName + AppSettings.Space + lastName;
    }

    //Private function to set validation flag associated to the ApiKey returned in case of bad request.
    private setValidationFlagOn(key: string) {
        this.resetValidationKeys();
        switch (key) {
            case AppSettings.PatientId: this.valPatId = true;
                break;
            case AppSettings.InsuranceId: this.valInsId = true;
                break;
            case AppSettings.InsurancePublicId: this.valInsPubId = true;
                break;
        }
    }

    //Private function to reset validation properties to hide invalid test from template
    private resetValidationKeys() {
        this.valInsId = this.valInsPubId = this.valPatId = false;
    }

    //Private method to clear patient insurance data when a request is made.
    private clearPatientInsuranceData() {
        this.patientInsuranceModel.InsuranceId = this.patientInsuranceModel.PatientId = 0;
        this.insId = this.patId = null;
        this.patientInsuranceModel.InsurancePublicId = this.insPubId = AppSettings.Empty;
        this.resetValidationKeys();
    }

    //Private function set patient insurance model
    private setPatientInsuranceModel() {
        this.patientInsuranceModel.InsuranceId = this.insId;
        this.patientInsuranceModel.PatientId = this.patId;
        this.patientInsuranceModel.InsurancePublicId = this.insPubId;
    }
}