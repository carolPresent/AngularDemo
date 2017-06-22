//This is the point where './main.ts' hits

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app';
import { ServerComponent } from './server/server';
import { PatientComponent } from './patient/patient';
import { InsuranceComponent } from './insurance/insurance';
import { PatientInsuranceComponent } from './patientinsurance/patientinsurance';
import { SidebarComponent } from './side-bar/side-bar';
import { ServerService } from './servers.service';
import { LoginComponent } from './account/login';
import { LogoutComponent } from './account/logout';
import { RegisterComponent } from './account/register';

//Registering routes in angular router.
const appRoutes: Routes = [
    {
        path: 'patient',
        component: PatientComponent
    },
    {
        path: 'insurance',
        component: InsuranceComponent
    },
    {
        path: 'patientinsurance',
        component: PatientInsuranceComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'Home/Main',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

//Various imports, declarations, providers, injectables via NgModule
@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpModule,
        Ng2Bs3ModalModule],
    declarations: [AppComponent,
        ServerComponent,
        PatientComponent,
        PatientInsuranceComponent,
        InsuranceComponent,
        SidebarComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent],
    providers: [CookieService,
        ServerService,
        AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }