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

    private firstName: string = '';
    private middleName: string = '';
    private lastName: string = '';
    private userId: string = '';
    private userPassword: string = '';

    private valFirstName: boolean = false;
    private valMiddleName: boolean = false;
    private valLastName: boolean = false;
    private valUserId: boolean = false;
    private valUserPassword: boolean = false;
    private messageOnUserIdInput: string = '';

    private userModel = {
        FirstName: '',
        MiddleName: '',
        LastName: '',
        UserId: '',
        UserPassword: ''
    }

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
                    alert(`Error ${response.status}`);
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
            case "FirstName": this.valFirstName = true;
                break;
            case "MiddleName": this.valMiddleName = true;
                break;
            case "LastName": this.valLastName = true;
                break;
            case "UserId": this.valUserId = true;
                this.messageOnUserIdInput = 'Invalid';
                break;
            case "UserPassword": this.valUserPassword = true;
                break;
            case "UserAlreadyExist": this.valUserId = true;
                this.messageOnUserIdInput = 'Already taken';
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
        this.firstName = this.middleName = this.lastName = this.userId = this.userPassword = '';
    }

    private resetValidationKeys() {
        this.valFirstName = this.valLastName = this.valMiddleName = this.valUserId = this.valUserPassword = false;
    }
}