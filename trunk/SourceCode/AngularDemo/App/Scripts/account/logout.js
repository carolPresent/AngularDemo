"use strict";
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
var router_1 = require("@angular/router");
var app_1 = require("../app");
var appSettings_1 = require("../appSettings");
//import { SidebarComponent } from '../side-bar/side-bar';
var LogoutComponent = (function () {
    function LogoutComponent(appComponent, router /*, private sidebarComponent: SidebarComponent*/) {
        this.appComponent = appComponent;
        this.router = router; /*, private sidebarComponent: SidebarComponent*/
    }
    LogoutComponent.prototype.ngOnInit = function () {
        this.appComponent.removeKey(appSettings_1.AppSettings.AuthCookie);
        this.appComponent.loggedIn = false;
        location.href = "/Home/Main";
    };
    return LogoutComponent;
}());
LogoutComponent = __decorate([
    core_1.Component({
        selector: 'logout',
        template: '<div class=\'text-center\'>Logging out...</div>'
    }),
    __metadata("design:paramtypes", [app_1.AppComponent, router_1.Router /*, private sidebarComponent: SidebarComponent*/])
], LogoutComponent);
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.js.map