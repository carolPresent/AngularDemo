import { Component } from '@angular/core';

import { AppComponent } from '../app';

@Component({
    selector: 'side-bar',
    templateUrl: '/Home/Sidebar'
})

export class SidebarComponent {
    constructor(private appComponent: AppComponent) { }

    private sideBarTabs = [];

    ngOnInit() {
        if (this.appComponent.loggedIn) {
            this.sideBarTabs = [{
                routerLink: '/patient',
                text: 'Patient',
                classes: 'active',
                routerLinkActive: 'active'
            }, {
                routerLink: '/insurance',
                text: 'Insurance',
                classes: '',
                routerLinkActive: 'active'
            }, {
                routerLink: '/patientinsurance',
                text: 'Create patient insurance',
                classes: '',
                routerLinkActive: 'active'
            }, {
                routerLink: '/logout',
                text: 'Logout',
                classes: '',
                routerLinkActive: 'active'
            }];
        }
    }
}