"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = (function () {
    function AppSettings() {
    }
    return AppSettings;
}());
//public static API_END_POINT: string = "http://192.168.0.101:1300/";
AppSettings.API_END_POINT = "http://192.168.11.63:1300/";
AppSettings.Patient = "patient";
AppSettings.Insurance = "insurance";
AppSettings.PatientInsurance = "patientinsurance";
AppSettings.Login = "login";
AppSettings.Account = "account";
AppSettings.AuthCookie = "httpCookie";
AppSettings.UserName = "username";
AppSettings.Password = "password";
AppSettings.GrantType = "grant_type";
AppSettings.OkStatusCode = 200;
AppSettings.InternalServerErrorStatusCode = 500;
AppSettings.BadRequestStatusCode = 400;
AppSettings.UnauthorizedRequestStatusCode = 401;
AppSettings.SuccessStatus = 'Success';
AppSettings.FailedStatus = 'Failed';
exports.AppSettings = AppSettings;
//# sourceMappingURL=appSettings.js.map