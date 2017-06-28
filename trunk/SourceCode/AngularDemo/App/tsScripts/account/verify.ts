//This is the verify component.

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../app';
import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';

@Component({
    selector: 'verify',
    templateUrl:'/Home/Verify'
})

export class VerifyComponent {
    constructor(private appComponent: AppComponent, private serverService: ServerService, private router: Router) { }

    ngOnInit() {
        if (this.appComponent.loggedIn) {
            this.router.navigate(['./patient']);
        }
    }

    //Private variables of the component
    private handle: string = AppSettings.Empty;
    private password: string = AppSettings.Empty;
    private verificationCode: string = AppSettings.Empty;
    private valHandle: boolean = false;
    private valPasssword: boolean = false;
    private valVerificationCode: boolean = false;
    private showVerificationMessage: boolean = false;
    private colorClassForVerificationMessage: string = AppSettings.TextDanger;
    private verificationMessage: string;

    //This is the verification model used to send a verification request.
    private verificationModel = {
        Handle: this.handle,
        Password: this.password,
        VerificationCode: this.verificationCode
    }

    //Private function to navigate to login page
    private navigateToLogin() {
        this.router.navigate(['./login']);
    }

    //Private function to send verification request to verify a user account.
    private sendVerificationRequest() {
        if (!this.validateVariables())
            return;
        this.setVerificationModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.Verify, this.verificationModel).subscribe(
            (response) => {
                this.showVerificationMessage = true;
                var body = response.json();
                this.verificationMessage = body.data;
                console.log(this.verificationMessage);
                if (body.status === AppSettings.SuccessStatus) {
                    this.resetVerificationData();
                    this.colorClassForVerificationMessage = AppSettings.TextSuccess;
                } else {
                    this.setValidationFlagOn(body.data);
                    this.colorClassForVerificationMessage = AppSettings.TextDanger;
                }
            },
            (error) => {
                alert(AppSettings.SomeErrorOccured);
            }
        )
    }

    //Private method to validate variables for verification request
    private validateVariables() {
        this.valHandle = this.valPasssword = this.valVerificationCode = false;
        let returnItem: boolean = true;
        if (this.handle.length === 0) {
            this.valHandle = true;
            returnItem = false;
        }
        if (this.password.length === 0) {
            this.valPasssword = true;
            returnItem = false;
        }
        if (this.verificationCode.length === 0) {
            this.valVerificationCode = true;
            returnItem = false;
        }
        return returnItem;
    }

    //Private method to reset verification data from view
    private resetVerificationData() {
        this.handle = this.password = this.verificationCode = AppSettings.Empty;
        this.valHandle = this.valPasssword = this.valVerificationCode = false;
    }

    //Private function to set validation key in case of bad request
    private setValidationFlagOn(key: string) {
        switch (key)
        {
            case AppSettings.Handle: this.valHandle = true;
                break;
            case AppSettings.Password: this.valPasssword = true;
                break;
            case AppSettings.VerificationCode: this.valVerificationCode = true;
                break;
        }
    }

    //Private function to set verification model from view input elements.
    private setVerificationModel() {
        this.verificationModel.Handle = this.handle;
        this.verificationModel.Password = this.password;
        this.verificationModel.VerificationCode = this.verificationCode;
    }
}