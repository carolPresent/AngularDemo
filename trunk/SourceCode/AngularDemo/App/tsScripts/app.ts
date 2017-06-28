//This is the initial template where all child templates are rendered.

import { Component, Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

import { AppSettings } from './appSettings';

@Component({
    selector: 'my-app',
    templateUrl: '/Home/App'
})

@Injectable()
export class AppComponent {
    constructor(private __cookieService: CookieService) { }

    ngOnInit() {
        if (this.getObject(AppSettings.AuthCookie)) {
            this.loggedIn = true;
        }
    }

    public loggedIn: boolean = false;

    //Public method to remove cookie from browser
    removeKey(key: string) {
        this.__cookieService.remove(key);
    }

    //Public method to get string from cookie from browser
    getKey(key: string) {
        return this.__cookieService.get(key);
    }

    //Public method to get an object from cookie from browser
    getObject(key: string) {
        return this.__cookieService.getObject(key);
    }

    //Public method to put a string to cookie to browser
    putKey(key: string, value: string) {
        this.__cookieService.put(key, value);
    }

    //Public method to put an object to cookie to browser
    putObject(key: string, value: Object) {
        this.__cookieService.putObject(key, value);
    }
}