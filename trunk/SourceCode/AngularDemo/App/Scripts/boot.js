"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var app_1 = require("./app");
var server_1 = require("./server/server");
var patient_1 = require("./patient/patient");
var insurance_1 = require("./insurance/insurance");
var patientinsurance_1 = require("./patientinsurance/patientinsurance");
var side_bar_1 = require("./side-bar/side-bar");
var servers_service_1 = require("./servers.service");
var login_1 = require("./account/login");
var logout_1 = require("./account/logout");
var register_1 = require("./account/register");
var appRoutes = [
    {
        path: 'patient',
        component: patient_1.PatientComponent
    },
    {
        path: 'insurance',
        component: insurance_1.InsuranceComponent
    },
    {
        path: 'patientinsurance',
        component: patientinsurance_1.PatientInsuranceComponent
    },
    {
        path: 'login',
        component: login_1.LoginComponent
    },
    {
        path: 'Home/Main',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'logout',
        component: logout_1.LogoutComponent
    },
    {
        path: 'register',
        component: register_1.RegisterComponent
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(appRoutes),
            forms_1.FormsModule,
            http_1.HttpModule,
            ng2_bs3_modal_1.Ng2Bs3ModalModule],
        declarations: [app_1.AppComponent,
            server_1.ServerComponent,
            patient_1.PatientComponent,
            patientinsurance_1.PatientInsuranceComponent,
            insurance_1.InsuranceComponent,
            side_bar_1.SidebarComponent,
            login_1.LoginComponent,
            logout_1.LogoutComponent,
            register_1.RegisterComponent],
        providers: [cookies_service_1.CookieService,
            servers_service_1.ServerService,
            app_1.AppComponent],
        bootstrap: [app_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=boot.js.map