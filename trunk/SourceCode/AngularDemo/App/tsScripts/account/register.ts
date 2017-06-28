//This is the register component.

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../app';
import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';

@Component({
    selector: 'register',
    templateUrl: '/Home/Register'
})

export class RegisterComponent {
    constructor(private appComponent: AppComponent, private serverService: ServerService, private router: Router) { }

    //Private variables of the component.
    private firstName: string = AppSettings.Empty;
    private middleName: string = AppSettings.Empty;
    private lastName: string = AppSettings.Empty;
    private userHandle: string = AppSettings.Empty;
    private userPassword: string = AppSettings.Empty;
    private userConfirmPassword: string = AppSettings.Empty;
    private userEmailId: string = AppSettings.Empty;
    private valFirstName: boolean = false;
    private valMiddleName: boolean = false;
    private valLastName: boolean = false;
    private valUserHandle: boolean = false;
    private valUserPassword: boolean = false;
    private valUserEmail: boolean = false;
    private valUserConfirmPassword: boolean = false;
    private messageOnUserIdInput: string = AppSettings.Empty;
    private showSuccessRegisterMessage: boolean = false;

    //User model to register.
    private userModel = {
        FirstName: this.firstName,
        MiddleName: this.middleName,
        LastName: this.lastName,
        Handle: this.userHandle,
        Password: this.userPassword,
        EmailId: this.userEmailId
    }

    //Private functions to send register request
    private sendRegisterRequest() {
        if (!this.validateVariable())
            return;
        this.setRegisterModel();
        this.showSuccessRegisterMessage = false;
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.Account, this.userModel).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.resetRegisterData();
                        this.showSuccessRegisterMessage = true;
                    } else {
                        this.setValidationFlagOn(body.data);
                    }
                } else {
                    alert(`${AppSettings.Error} ${response.status}`);
                }
            },
            (error) => {
            }
        )
    }

    //Private function to validate parameters on view.
    private validateVariable() {
        this.resetValidationKeys();
        let returnItem: boolean = true;
        if (this.firstName.length === 0 || this.firstName.length > 30) {
            returnItem = false;
            this.valFirstName = true;
        }
        if (this.lastName.length === 0 || this.lastName.length > 30) {
            returnItem = false;
            this.valLastName = true;
        }
        if (this.middleName.length > 40) {
            returnItem = false;
            this.valMiddleName = true;
        }
        if (this.userPassword.length === 0 || this.userPassword.length > 40) {
            returnItem = false;
            this.valUserPassword = true;
        }
        if (this.userHandle.length === 0 || this.userHandle.length > 40) {
            returnItem = false;
            this.messageOnUserIdInput = AppSettings.Invalid;
            this.valUserHandle = true;
        }
        if (this.userConfirmPassword !== this.userPassword) {
            returnItem = false;
            this.valUserConfirmPassword = true;
        }
        if (!AppSettings.validateEmail(this.userEmailId)) {
            returnItem = false;
            this.valUserEmail = true;
        }
        return returnItem;
    }

    //Private function to navigate to login
    private navigateToLogin() {
        this.router.navigate(['./login']);
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
            case AppSettings.UserId: this.valUserHandle = true;
                this.messageOnUserIdInput = AppSettings.Invalid;
                break;
            case AppSettings.UserPassword: this.valUserPassword = true;
                break;
            case AppSettings.UserAlreadyExist: this.valUserHandle = true;
                this.messageOnUserIdInput = AppSettings.AlreadyTaken;
                break;
            case AppSettings.EmailId: this.valUserEmail = true;
                break;
        }
    }

    //Private function to reset validation properties from template.
    private resetValidationKeys() {
        this.valFirstName = this.valLastName = this.valMiddleName = this.valUserHandle = this.valUserPassword = this.valUserEmail = this.valUserConfirmPassword = false;
    }

    //Private method to reset register data from view.
    private resetRegisterData() {
        this.userHandle = this.userEmailId = this.userConfirmPassword = this.userPassword = this.firstName = this.middleName = this.lastName = AppSettings.Empty;
    }

    //Private method to set register data from view.
    private setRegisterModel() {
        this.userModel.EmailId = this.userEmailId;
        this.userModel.FirstName = this.firstName;
        this.userModel.Handle = this.userHandle;
        this.userModel.LastName = this.lastName;
        this.userModel.MiddleName = this.middleName;
        this.userModel.Password = this.userPassword;
    }
}