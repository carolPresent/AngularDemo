//This is the service module which interacts with HTTP and making AJAX request. All components can access its methods.

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppComponent } from './app';
import { AppSettings } from './appSettings';

@Injectable()
export class ServerService {
    constructor(private http: Http, private appComponent: AppComponent) { }

    //Private function to create authorization headers.
    private createHeaders(headers: Headers) {
        var authCookie = this.appComponent.getKey(AppSettings.AuthCookie);
        if (!authCookie)
            return;
        var token = JSON.parse(this.appComponent.getKey(AppSettings.AuthCookie));
        headers.append(AppSettings.Authorization, token.token_type + AppSettings.Space + token.access_token);
    }

    //Private function to create login headers.
    private createLoginHeaders(headers: Headers) {
        headers.append(AppSettings.ContentType, AppSettings.UrlEncoded);
    }

    //Public function to make a login request.
    loginRequest(url: string, data: any) {
        let headers = new Headers();
        this.createLoginHeaders(headers);
        return this.http.post(url, data, { headers: headers });
    }

    //Public function to make a post request.
    postRequest(url: string, data: any) {
        let headers = new Headers();
        this.createHeaders(headers);
        return this.http.post(url, data, { headers: headers });
    }

    //Public function to make a get request.
    getRequest(url: string) {
        let headers = new Headers();
        this.createHeaders(headers);
        return this.http.get(url, { headers: headers });
    }
}