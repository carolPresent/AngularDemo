"use strict";
//This is the service module which interacts with HTTP and making AJAX request. All components can access its methods.
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
var http_1 = require("@angular/http");
var app_1 = require("./app");
var appSettings_1 = require("./appSettings");
var ServerService = (function () {
    function ServerService(http, appComponent) {
        this.http = http;
        this.appComponent = appComponent;
    }
    //Private function to create authorization headers.
    ServerService.prototype.createHeaders = function (headers) {
        var authCookie = this.appComponent.getKey(appSettings_1.AppSettings.AuthCookie);
        if (!authCookie)
            return;
        var token = JSON.parse(this.appComponent.getKey(appSettings_1.AppSettings.AuthCookie));
        headers.append(appSettings_1.AppSettings.Authorization, token.token_type + appSettings_1.AppSettings.Space + token.access_token);
    };
    //Private function to create login headers.
    ServerService.prototype.createLoginHeaders = function (headers) {
        headers.append(appSettings_1.AppSettings.ContentType, appSettings_1.AppSettings.UrlEncoded);
    };
    //Public function to make a login request.
    ServerService.prototype.loginRequest = function (url, data) {
        var headers = new http_1.Headers();
        this.createLoginHeaders(headers);
        return this.http.post(url, data, { headers: headers });
    };
    //Public function to make a put request
    ServerService.prototype.putRequest = function (url, data) {
        var headers = new http_1.Headers();
        this.createHeaders(headers);
        return this.http.put(url, data, { headers: headers });
    };
    //Public function to make a post request.
    ServerService.prototype.postRequest = function (url, data) {
        var headers = new http_1.Headers();
        this.createHeaders(headers);
        return this.http.post(url, data, { headers: headers });
    };
    //Public function to make a get request.
    ServerService.prototype.getRequest = function (url) {
        var headers = new http_1.Headers();
        this.createHeaders(headers);
        return this.http.get(url, { headers: headers });
    };
    return ServerService;
}());
ServerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_1.AppComponent])
], ServerService);
exports.ServerService = ServerService;
//# sourceMappingURL=servers.service.js.map