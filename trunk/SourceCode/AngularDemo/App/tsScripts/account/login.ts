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

    //Private functions of the component.
    private navigateToRegister() {
        this.router.navigate(['./register']);
    }

    private sendLoginRequest() {
        let data = `${AppSettings.UserName}=${this.userId}&${AppSettings.Password}=${this.userPassword}&${AppSettings.GrantType}=${AppSettings.Password}`;
        this.serverService.loginRequest(AppSettings.API_END_POINT + AppSettings.Login, data).subscribe(
            (response) => {
                if (response.status === AppSettings.OkStatusCode) {
                    var body = response.json();
                    this.appComponent.loggedIn = true;
                    this.appComponent.putObject(AppSettings.AuthCookie, body);
                    location.href = "/Home/Main";
                }
                else {
                    alert(AppSettings.InvalidLoginRequest);
                    return;
                }
            },
            (error) => console.log(error)
        );
    }

}