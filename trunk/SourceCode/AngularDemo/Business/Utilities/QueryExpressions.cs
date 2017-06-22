using Data;
using DataTransferObject.Constants;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;
using System;
using System.Linq;

namespace Business.Utilities
{
    /// <summary>
    /// Class contains query expressions to use in entity framework
    /// </summary>
    internal class QueryExpressions
    {
        public static Func<object, bool> AlwaysTrue()
        {
            return new Func<object, bool>(m => true);
        }

        /// <summary>
        /// Generic query expression for Patient service
        /// </summary>
        /// <param name="patientQuery">patientQuery having query on patient</param>
        /// <returns>Func delegate to return to the Entity framework of type Patient,bool</returns>
        public static Func<Patient, bool> Patient(PatientQuery patientQuery)
        {
            return new Func<Patient, bool>(m => (!patientQuery.Id.Equals(CommonInteger.OptionalIntegerParam) ? m.PK_Patients.Equals(patientQuery.Id) : true) &&
            (!string.IsNullOrWhiteSpace(patientQuery.Name) ? string.Concat(m.DF_Patients_FirstName,m.DF_Patients_LastName).IndexOf(patientQuery.Name, StringComparison.OrdinalIgnoreCase)>=0 : true) &&
            (!string.IsNullOrWhiteSpace(patientQuery.PhoneNumber) ? m.DF_Patients_Phone.Equals(patientQuery.PhoneNumber) : true));
        }

        /// <summary>
        /// Generic query expression for Insurance service
        /// </summary>
        /// <param name="insuranceQuery">insuranceQuery having query on insurance</param>
        /// <returns>Func delegate to return to the Entity framework of type Insurance,bool</returns>
        public static Func<Insurance, bool> Insurance(InsuranceQuery insuranceQuery)
        {
            var ifInsuranceQueryIdIsZero = !insuranceQuery.Id.Equals(CommonInteger.OptionalIntegerParam);

            return new Func<Insurance, bool>(m => (ifInsuranceQueryIdIsZero ? m.PK_Insurances.Equals(insuranceQuery.Id) : true) &&
            (!string.IsNullOrWhiteSpace(insuranceQuery.Name) ? m.DF_Insurances_Name.IndexOf(insuranceQuery.Name, StringComparison.OrdinalIgnoreCase)>=0 : true) &&
            (!string.IsNullOrWhiteSpace(insuranceQuery.PhoneNumber) ? m.DF_Insurances_Phone.Equals(insuranceQuery.PhoneNumber) : true) &&
            (!string.IsNullOrWhiteSpace(insuranceQuery.PubId) ? m.DF_Insurances_PublicId.Equals(insuranceQuery.PubId) : true));
        }

        /// <summary>
        /// Generic query expression for User service
        /// </summary>
        /// <param name="userQuery">userQuery having query on user</param>
        /// <returns>Func delegate to return to the Entity framework of type User,bool</returns>
        public static Func<User, bool> User(UserQuery userQuery)
        {
            return new Func<User, bool>(m => (!string.IsNullOrWhiteSpace(userQuery.Name) ? string.Concat(m.DF_Users_FirstName, m.DF_Users_LastName).IndexOf(userQuery.Name, StringComparison.OrdinalIgnoreCase)>=0 : true) &&
            (!string.IsNullOrWhiteSpace(userQuery.UserId) ? m.UserPasswords.Select(obj => obj.DF_UserPasswords_UserId.Equals(userQuery.UserId)).ToArray()[0] : true));
        }

        /// <summary>
        /// Generic query expression for PatientInsurance service
        /// </summary>
        /// <param name="patientInsuranceQuery">patientInsuranceQuery having query on patient insurance</param>
        /// <returns>Func delegate to return to the Entity framework of type PatientInsurance,bool</returns>
        public static Func<PatientInsurance, bool> PatientInsurance(PatientInsuranceQuery patientInsuranceQuery)
        {
            return new Func<PatientInsurance, bool>(m => (!patientInsuranceQuery.PatientId.Equals(CommonInteger.OptionalIntegerParam) ? m.FK_PatientInsurances_Patients.Equals(patientInsuranceQuery.PatientId) : true) &&
            (!patientInsuranceQuery.InsuranceId.Equals(CommonInteger.OptionalIntegerParam) ? m.FK_PatientInsurances_Insurances.Equals(patientInsuranceQuery.InsuranceId) : true));
        }


        /// <summary>
        /// Generic query expression for Account service
        /// </summary>
        /// <param name="loginDto"></param>
        /// <returns></returns>
        public static Func<UserPassword,bool> UserLogin(LoginDto loginDto)
        {
            return new Func<UserPassword, bool>(m => m.DF_UserPasswords_UserId.Equals(loginDto.LoginId) && m.DF_UserPasswords_UserPassword.Equals(loginDto.LoginPassword));
        }
    }
}
