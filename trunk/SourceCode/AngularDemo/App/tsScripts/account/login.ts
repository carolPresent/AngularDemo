//This is the login component.

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../app';
import { ServerService } from '../servers.service';
import { AppSettings } from '../appSettings';

@Component({
    selector: 'login',
    templateUrl: '/Home/Login'
})

export class LoginComponent {
    constructor(private appComponent: AppComponent, private serverService: ServerService, private router: Router) { }

    ngOnInit() {
        if (this.appComponent.loggedIn) {
            this.router.navigate(['./patient']);
        }
    }

    //Private variable of the component.
    private userId: string = AppSettings.Empty;
    private userPassword: string = AppSettings.Empty;
    private showLoggingInLabel: boolean = false;
    private showUnsuccessfulLoginLabel: boolean = false;

    //Private function to navigate to register template
    private navigateToRegister() {
        this.router.navigate(['./register']);
    }

    //Private function to send login request
    private sendLoginRequest() {
        this.showLoggingInLabel = true;
        this.showUnsuccessfulLoginLabel = false;
        let data = `${AppSettings.UserName}=${this.userId}&${AppSettings.Password}=${this.userPassword}&${AppSettings.GrantType}=${AppSettings.Password}`;
        this.serverService.loginRequest(AppSettings.API_END_POINT + AppSettings.Login, data).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    this.appComponent.loggedIn = true;
                    this.appComponent.putObject(AppSettings.AuthCookie, body);
                    location.href = "/Home/Main";
                }
            },
            (error) => {
                this.showLoggingInLabel = false;
                this.showUnsuccessfulLoginLabel = true;
            }
        );
    }

}