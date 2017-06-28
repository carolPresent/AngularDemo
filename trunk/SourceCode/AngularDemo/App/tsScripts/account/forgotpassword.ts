//This is the forgot password component.

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';
import { AppComponent } from '../app';

@Component({
    selector: 'forgotpassword',
    templateUrl: '/Home/ForgotPassword'
})

export class ForgotPasswordComponent {
    constructor(private serverService: ServerService, private appComponent: AppComponent, private router: Router) { }

    ngOnInit() {
        if (this.appComponent.loggedIn) {
            this.router.navigate(['./login']);
        }
    }

    //Private variables used in the component.
    private userHandle: string = AppSettings.Empty;
    private userVerificationCode: string = AppSettings.Empty;
    private userPassword: string = AppSettings.Empty;
    private userConfirmPassword: string = AppSettings.Empty;
    private valHandle: boolean = false;
    private valVerificationCode: boolean = false;
    private valPassword: boolean = false;
    private valConfirmPassword: boolean = false;
    private hideForgotPasswordFrom: boolean = false;
    private hideResetPasswordForm: boolean = true;
    private heading: string = AppSettings.ForgotPasswordFormHeading;
    private statusMessage: string = AppSettings.Empty;
    private statusMessageClass: string = AppSettings.TextSuccess;

    //Private model to send a forgot password request as well as reset password request
    private commonRequestModel = {
        Handle: this.userHandle,
        VerificationCode: this.userVerificationCode,
        Password: this.userPassword
    }

    //Private method to send a POST forgot password request
    private sendForgotPasswordRequest() {
        if (!this.validateVariableForgotPassword())
            return;
        this.setCommonRequestModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.ForgotPassword, this.commonRequestModel).subscribe(
            (response) => {
                var body = response.json();
                if (body.status === AppSettings.SuccessStatus) {
                    this.statusMessageClass = AppSettings.TextSuccess;
                    this.statusMessage = AppSettings.ForgotPasswordRequestCreatedSuccessfully;
                    setTimeout(() => {
                        this.heading = AppSettings.ResetPasswordFormHeading;
                        this.hideForgotPasswordFrom = true;
                        this.hideResetPasswordForm = false;
                    }, 2000);
                } else {
                    this.statusMessage = body.data;
                    this.statusMessageClass = AppSettings.TextDanger;
                }
            },
            (error) => {
            }
        )
    }

    //Private function to send PUT reset password request
    private sendResetPasswordRequest() {
        if (!this.validateVariableResetPassword())
            return;
        this.setCommonRequestModel();
        this.serverService.putRequest(AppSettings.API_END_POINT + AppSettings.ResetPassword, this.commonRequestModel).subscribe(
            (response) => {
                var body = response.json();
                if (body.status === AppSettings.SuccessStatus) {
                    this.statusMessageClass = AppSettings.TextSuccess;
                    this.statusMessage = AppSettings.ResetPasswordSuccessful;
                    setTimeout(() => {
                        this.router.navigate(['./login']);
                    }, 2000);
                } else {
                    this.statusMessageClass = AppSettings.TextDanger;
                    this.statusMessage = body.data;
                }
            },
            (error) => {
            }
        )
    }

    //Private method to validate variables for forgot password POST request
    private validateVariableForgotPassword() {
        let returnItem: boolean = true;
        if (this.userHandle.length === 0) {
            returnItem = false;
            this.valHandle = true;
        }
        return returnItem;
    }

    //Private method to validate variables for reset password PUT request
    private validateVariableResetPassword() {
        let returnItem: boolean = true;
        if (this.userPassword.length === 0 || this.userPassword.length > 40) {
            returnItem = false;
            this.valPassword = true;
        }
        if (this.userVerificationCode.length === 0) {
            returnItem = false;
            this.valVerificationCode = true;
        }
        if (this.userPassword != this.userConfirmPassword) {
            returnItem = false;
            this.valConfirmPassword = true;
        }
        return returnItem;
    }

    //Private method to reset validation flags from view.
    private resetValidationFlags() {
        this.valHandle = this.valConfirmPassword = this.valPassword = this.valVerificationCode = false;
    }

    //Private method to set forgot password/reset password model.
    private setCommonRequestModel() {
        this.commonRequestModel.Handle = this.userHandle;
        this.commonRequestModel.Password = this.userPassword;
        this.commonRequestModel.VerificationCode = this.userVerificationCode;
    }
}