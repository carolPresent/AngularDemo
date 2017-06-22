//This is the logout component.

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../app';
import { AppSettings } from '../appSettings';

@Component({
    selector: 'logout',
    template: '<div class=\'text-center\'>Logging out...</div>'
})

export class LogoutComponent {
    constructor(private appComponent: AppComponent, private router: Router) { }

    ngOnInit() {
        this.appComponent.removeKey(AppSettings.AuthCookie);
        this.appComponent.loggedIn = false;
        location.href = "/Home/Main";
    }
}