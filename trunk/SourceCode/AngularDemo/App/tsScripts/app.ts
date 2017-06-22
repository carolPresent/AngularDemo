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
        this.checkCookie();
    }

    public loggedIn: boolean = false;

    private checkCookie() {
        if (this.getObject(AppSettings.AuthCookie)) {
            this.loggedIn = true;
        }
    }

    removeKey(key: string) {
        this.__cookieService.remove(key);
    }

    getKey(key: string) {
        return this.__cookieService.get(key);
    }

    getObject(key: string) {
        return this.__cookieService.getObject(key);
    }

    putKey(key: string, value: string) {
        this.__cookieService.put(key, value);
    }

    putObject(key: string, value: Object) {
        this.__cookieService.putObject(key, value);
    }
}