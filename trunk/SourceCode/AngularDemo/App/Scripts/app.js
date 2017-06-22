"use strict";
//This is the initial template where all child templates are rendered.
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
var core_2 = require("angular2-cookie/core");
var appSettings_1 = require("./appSettings");
var AppComponent = (function () {
    function AppComponent(__cookieService) {
        this.__cookieService = __cookieService;
        this.loggedIn = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.checkCookie();
    };
    //Private function for checking whether user is logged in or not.
    AppComponent.prototype.checkCookie = function () {
        if (this.getObject(appSettings_1.AppSettings.AuthCookie)) {
            this.loggedIn = true;
        }
    };
    //Public method to remove cookie from browser
    AppComponent.prototype.removeKey = function (key) {
        this.__cookieService.remove(key);
    };
    //Public method to get string from cookie from browser
    AppComponent.prototype.getKey = function (key) {
        return this.__cookieService.get(key);
    };
    //Public method to get an object from cookie from browser
    AppComponent.prototype.getObject = function (key) {
        return this.__cookieService.getObject(key);
    };
    //Public method to put a string to cookie to browser
    AppComponent.prototype.putKey = function (key, value) {
        this.__cookieService.put(key, value);
    };
    //Public method to put an object to cookie to browser
    AppComponent.prototype.putObject = function (key, value) {
        this.__cookieService.putObject(key, value);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/Home/App'
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_2.CookieService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map