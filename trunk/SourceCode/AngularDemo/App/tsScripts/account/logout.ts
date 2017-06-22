import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../app';
import { AppSettings } from '../appSettings';
//import { SidebarComponent } from '../side-bar/side-bar';

@Component({
    selector: 'logout',
    template: '<div class=\'text-center\'>Logging out...</div>'
})

export class LogoutComponent {
    constructor(private appComponent: AppComponent, private router: Router/*, private sidebarComponent: SidebarComponent*/) { }

    ngOnInit() {
        this.appComponent.removeKey(AppSettings.AuthCookie);
        this.appComponent.loggedIn = false;
        location.href = "/Home/Main";
    }
}