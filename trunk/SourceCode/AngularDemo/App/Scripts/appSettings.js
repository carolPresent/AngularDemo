"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Contains all the constants of the application.
var AppSettings = (function () {
    function AppSettings() {
    }
    return AppSettings;
}());
//public static API_END_POINT: string = "http://192.168.0.102:1300/";
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
AppSettings.Empty = '';
AppSettings.InvalidLoginRequest = "Id or password is wrong";
AppSettings.FirstName = "FirstName";
AppSettings.MiddleName = "MiddleName";
AppSettings.LastName = "LastName";
AppSettings.UserId = "UserId";
AppSettings.UserPassword = "UserPassword";
AppSettings.UserAlreadyExist = "UserAlreadyExist";
AppSettings.Invalid = "FirstName";
AppSettings.AlreadyTaken = "Already taken";
AppSettings.Error = "Error";
AppSettings.Space = " ";
AppSettings.Authorization = "Authorization";
AppSettings.UrlEncoded = "application/x-www-form-urlencoded";
AppSettings.ContentType = "Content-Type";
AppSettings.PatientInsuranceAdded = "Patient insurance added.";
AppSettings.PatientAdded = "Patient added";
AppSettings.InsuranceAdded = "Insurance added";
AppSettings.SomeErrorOccured = "Somme error occured";
AppSettings.ListCouldNotLoad = " list could not load";
AppSettings.PatientId = "PatientId";
AppSettings.InsuranceId = "InsuranceId";
AppSettings.InsurancePublicId = "InsurancePublicId";
AppSettings.Name = "Name";
AppSettings.PhoneNumber = "PhoneNumber";
AppSettings.Address = "Address";
AppSettings.Zero = 0;
AppSettings.Male = "Male";
AppSettings.Female = "Female";
AppSettings.Gender = "Gender";
exports.AppSettings = AppSettings;
//# sourceMappingURL=appSettings.js.map