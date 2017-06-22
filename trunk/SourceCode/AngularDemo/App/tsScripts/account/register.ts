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
    private userId: string = AppSettings.Empty;
    private userPassword: string = AppSettings.Empty;
    private valFirstName: boolean = false;
    private valMiddleName: boolean = false;
    private valLastName: boolean = false;
    private valUserId: boolean = false;
    private valUserPassword: boolean = false;
    private messageOnUserIdInput: string = '';

    //User model to register.
    private userModel = {
        FirstName: AppSettings.Empty,
        MiddleName: AppSettings.Empty,
        LastName: AppSettings.Empty,
        UserId: AppSettings.Empty,
        UserPassword: AppSettings.Empty
    }

    //Private functions of the component.
    private sendRegisterRequest() {
        this.setUserModel();
        this.serverService.postRequest(AppSettings.API_END_POINT + AppSettings.Account, this.userModel).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    if (body.status === AppSettings.SuccessStatus) {
                        this.router.navigate(['./login']);
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

    private navigateToRegister() {
        this.router.navigate(['./login']);
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
            case AppSettings.UserId: this.valUserId = true;
                this.messageOnUserIdInput = AppSettings.Invalid;
                break;
            case AppSettings.UserPassword: this.valUserPassword = true;
                break;
            case AppSettings.UserAlreadyExist: this.valUserId = true;
                this.messageOnUserIdInput = AppSettings.AlreadyTaken;
                break;
        }
    }

    private setUserModel() {
        this.userModel.FirstName = this.firstName;
        this.userModel.MiddleName = this.middleName;
        this.userModel.LastName = this.lastName;
        this.userModel.UserId = this.userId;
        this.userModel.UserPassword = this.userPassword;
    }

    private resetUserdata() {
        this.firstName = this.middleName = this.lastName = this.userId = this.userPassword = AppSettings.Empty;
    }

    private resetValidationKeys() {
        this.valFirstName = this.valLastName = this.valMiddleName = this.valUserId = this.valUserPassword = false;
    }
}