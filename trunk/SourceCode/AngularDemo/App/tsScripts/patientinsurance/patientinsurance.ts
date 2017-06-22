import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from '../app';
import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';

@Component({
    selector: 'patientinsurance',
    templateUrl: '/Home/PatientInsurance'
})

export class PatientInsuranceComponent {
    constructor(private appComponent: AppComponent, private serverService: ServerService, private router: Router) { }

    ngOnInit() {
        if (!this.appComponent.loggedIn) {
            this.router.navigate(['./Home/Main']);
        }
    }

    @ViewChild('patientModal')
    private patientModal: ModalComponent;

    @ViewChild('insuranceModal')
    private insuranceModal: ModalComponent;

    @ViewChild('patientInsuranceModal')
    private patientinsuranceModal: ModalComponent;

    private patientInsuranceModel = {
        PatientId: 0,
        InsuranceId: 0,
        InsurancePublicId: ''
    }

    private patId: number;
    private insId: number;
    private insPubId: string = '';
    private patientList: any = [];
    private insuranceList: any = [];
    private patientInsuranceList: any = [];
    private searchPatient: string = '';
    private searchInsurance: string = '';
    private searchPatientInsurance: string = '';
    private currentPatList: any[];
    private currentInsList: any[];
    private currentPatInsList: any[];

    private valPatId: boolean = false;
    private valInsId: boolean = false;
    private valInsPubId: boolean = false;

    private savePatientInsurance() {
        this.setPatientInsuranceModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.PatientInsurance, this.patientInsuranceModel).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status == AppSettings.SuccessStatus) {
                        this.clearPatientInsuranceData();
                        alert('Patient insurance added.');
                    }
                    else {
                        this.setValidationFlagOn(body.data);
                    }
                }
                else {
                    alert(`Error ${response.status}`);
                }
            },
            (error) => {
                alert('Some error occured.')
            }
        )
    }

    private getPatientList() {
        this.serverService.getRequest(AppSettings.API_END_POINT + AppSettings.Patient).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.patientList = JSON.parse(body.data);
                        this.currentPatList = this.patientList;
                    } else {
                        alert('Patients list could not load.');
                    }
                } else {
                    alert(`Error ${response.status}.`);
                }
            },
            (error) => {
                alert('Some error occurred.')
            }
        )
    }

    private getInsuranceList() {
        this.serverService.getRequest(AppSettings.API_END_POINT + AppSettings.Insurance).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.insuranceList = JSON.parse(body.data);
                        this.currentInsList = this.insuranceList;
                    } else {
                        alert('Insurances list could not load.');
                    }
                } else {
                    alert(`Error ${response.status}.`);
                }
            },
            (error) => {
                alert('Some problem occured.');
            }
        )
    }

    private getPatientInsuranceList() {
        this.serverService.getRequest(AppSettings.API_END_POINT + AppSettings.PatientInsurance).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.patientInsuranceList = JSON.parse(body.data);
                        this.currentPatInsList = this.patientInsuranceList;
                    } else {
                        alert('Patient insurance list could not be fetched.');
                    }
                } else {
                    alert(`Error ${response.status}.`);
                }
            },
            (error) => {
                alert('Some error occured.');
            }
        )
    }

    private filterPatientList() {
        this.currentPatList = this.patientList.filter((patient) => {
            return patient.FirstName.toLowerCase().includes(this.searchPatient) || patient.PhoneNumber.includes(this.searchPatient)
                || patient.Address.toLowerCase().includes(this.searchPatient);
        });
    }

    private filterInsuranceList() {
        this.currentInsList = this.insuranceList.filter((insurance) => {
            return insurance.Name.toLowerCase().includes(this.searchInsurance) || insurance.InsurancePublicId.includes(this.searchInsurance);
        });
    }

    private filterPatientInsuranceList() {
        this.currentPatInsList = this.patientInsuranceList.filter((patientInsurance) => {
            var patientInfo = patientInsurance.PatientInfo;
            var insuranceInfo = patientInsurance.InsuranceInfo;
            return patientInfo.FirstName.toLowerCase().includes(this.searchPatientInsurance) || patientInfo.Address.includes(this.searchPatientInsurance) ||
                insuranceInfo.Name.toLowerCase().includes(this.searchPatientInsurance) || insuranceInfo.InsurancePublicId.includes(this.searchPatientInsurance);
        });
    }

    private openPatientModal() {
        this.currentPatList = this.patientList;
        this.getPatientList();
        this.patientModal.open();
    }

    private openInsuranceModal() {
        this.currentInsList = this.insuranceList;
        this.getInsuranceList();
        this.insuranceModal.open();
    }

    private openPatientInsuranceModal() {
        this.currentPatInsList = this.patientInsuranceList;
        this.getPatientInsuranceList();
        this.patientinsuranceModal.open();
    }

    private selectPatient(patientId: number) {
        this.resetValidationKeys();
        this.patId = patientId;
        this.patientModal.close();
    }

    private selectInsurance(insuranceId: number, insurancePublicId: string) {
        this.resetValidationKeys();
        this.insId = insuranceId;
        this.insPubId = insurancePublicId;
        this.insuranceModal.close();
    }

    private selectPatientInsurance(patientInfo: any, insuranceInfo: any) {
        this.resetValidationKeys();
        this.patId = patientInfo.Id;
        this.insId = insuranceInfo.Id;
        this.insPubId = insuranceInfo.InsurancePublicId;
        this.patientinsuranceModal.close();
    }

    private concatNames(firstName: string, lastName: string) {
        return firstName + ' ' + lastName;
    }

    private setValidationFlagOn(key: string) {
        this.resetValidationKeys();
        switch (key) {
            case "PatientId": this.valPatId = true;
                break;
            case "InsuranceId": this.valInsId = true;
                break;
            case "InsurancePublicId": this.valInsPubId = true;
                break;
        }
    }

    private resetValidationKeys() {
        this.valInsId = this.valInsPubId = this.valPatId = false;
    }

    private setPatientInsuranceModel() {
        this.patientInsuranceModel.InsuranceId = this.insId;
        this.patientInsuranceModel.InsurancePublicId = this.insPubId;
        this.patientInsuranceModel.PatientId = this.patId;
    }

    private clearPatientInsuranceData() {
        this.patientInsuranceModel.InsuranceId = this.patientInsuranceModel.PatientId = 0;
        this.insId = this.patId = null;
        this.patientInsuranceModel.InsurancePublicId = this.insPubId = '';
        this.resetValidationKeys();
    }

}