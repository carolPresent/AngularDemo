"use strict";
//This component is the side bar of the application.Only active when user is logged in.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_1 = require("../app");
var SidebarComponent = (function () {
    function SidebarComponent(appComponent) {
        this.appComponent = appComponent;
        //Side bars tab list.
        this.sideBarTabs = [];
    }
    SidebarComponent.prototype.ngOnInit = function () {
        //If user logged then sidebar tabs will have links for navigation.
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
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    core_1.Component({
        selector: 'side-bar',
        templateUrl: '/Home/Sidebar'
    }),
    __metadata("design:paramtypes", [app_1.AppComponent])
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=side-bar.js.map