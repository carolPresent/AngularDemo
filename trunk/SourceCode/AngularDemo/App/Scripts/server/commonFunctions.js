"use strict";
//This is common function component
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
var appSettings_1 = require("../appSettings");
var servers_service_1 = require("../servers.service");
var CommonFunctionService = (function () {
    function CommonFunctionService(serverService) {
        this.serverService = serverService;
    }
    //Public method to get patient list. Saves code redundancy.
    CommonFunctionService.prototype.getPatientList = function (callback) {
        this.serverService.getRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Patient).subscribe(function (response) {
            var body = response.json();
            if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                callback(JSON.parse(body.data));
            }
            else {
                alert("" + (appSettings_1.AppSettings.Patient, appSettings_1.AppSettings.ListCouldNotLoad));
                callback([]);
            }
        }, function (error) {
            alert(appSettings_1.AppSettings.SomeErrorOccured);
            callback([]);
        });
    };
    //Public method to get insurance list. Saves code redundancy.
    CommonFunctionService.prototype.getInsuranceList = function (callback) {
        this.serverService.getRequest(appSettings_1.AppSettings.API_END_POINT + appSettings_1.AppSettings.Insurance).subscribe(function (response) {
            var body = response.json();
            if (body.status === appSettings_1.AppSettings.SuccessStatus) {
                callback(JSON.parse(body.data));
            }
            else {
                alert("" + (appSettings_1.AppSettings.Insurance, appSettings_1.AppSettings.ListCouldNotLoad));
                callback([]);
            }
        }, function (error) {
            alert(appSettings_1.AppSettings.SomeErrorOccured);
            callback([]);
        });
    };
    return CommonFunctionService;
}());
CommonFunctionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [servers_service_1.ServerService])
], CommonFunctionService);
exports.CommonFunctionService = CommonFunctionService;
//# sourceMappingURL=commonFunctions.js.map