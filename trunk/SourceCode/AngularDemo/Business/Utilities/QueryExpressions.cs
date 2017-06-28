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
            return new Func<Patient, bool>(m => (!patientQuery.Id.Equals(CommonInteger.OptionalIntegerParam) ? m.Id.Equals(patientQuery.Id) : true) &&
            (!string.IsNullOrWhiteSpace(patientQuery.Name) ? m.FirstName.IndexOf(patientQuery.Name, StringComparison.OrdinalIgnoreCase) >= 0 : true) &&
            (!string.IsNullOrWhiteSpace(patientQuery.PhoneNumber) ? m.Phone.Equals(patientQuery.PhoneNumber) : true));
        }

        /// <summary>
        /// Generic query expression for Insurance service
        /// </summary>
        /// <param name="insuranceQuery">insuranceQuery having query on insurance</param>
        /// <returns>Func delegate to return to the Entity framework of type Insurance,bool</returns>
        public static Func<Insurance, bool> Insurance(InsuranceQuery insuranceQuery)
        {
            var ifInsuranceQueryIdIsZero = !insuranceQuery.Id.Equals(CommonInteger.OptionalIntegerParam);

            return new Func<Insurance, bool>(m => (ifInsuranceQueryIdIsZero ? m.Id.Equals(insuranceQuery.Id) : true) &&
            (!string.IsNullOrWhiteSpace(insuranceQuery.Name) ? m.Name.IndexOf(insuranceQuery.Name, StringComparison.OrdinalIgnoreCase) >= 0 : true) &&
            (!string.IsNullOrWhiteSpace(insuranceQuery.PhoneNumber) ? m.Phone.Equals(insuranceQuery.PhoneNumber) : true) &&
            (!string.IsNullOrWhiteSpace(insuranceQuery.PubId) ? m.PublicId.Equals(insuranceQuery.PubId) : true));
        }

        /// <summary>
        /// Generic query expression for User service
        /// </summary>
        /// <param name="userQuery">userQuery having query on user</param>
        /// <returns>Func delegate to return to the Entity framework of type User,bool</returns>
        public static Func<User, bool> User(UserQuery userQuery)
        {
            return new Func<User, bool>(m => (!string.IsNullOrWhiteSpace(userQuery.Name) ? m.FirstName.IndexOf(userQuery.Name, StringComparison.OrdinalIgnoreCase) >= 0 : true) &&
            (!string.IsNullOrWhiteSpace(userQuery.UserId) ? m.UserPasswords.Select(obj => obj.UserId.Equals(userQuery.UserId)).ToArray()[0] : true));
        }

        /// <summary>
        /// Generic query expression for PatientInsurance service
        /// </summary>
        /// <param name="patientInsuranceQuery">patientInsuranceQuery having query on patient insurance</param>
        /// <returns>Func delegate to return to the Entity framework of type PatientInsurance,bool</returns>
        public static Func<PatientInsurance, bool> PatientInsurance(PatientInsuranceQuery patientInsuranceQuery)
        {
            return new Func<PatientInsurance, bool>(m => (!patientInsuranceQuery.PatientId.Equals(CommonInteger.OptionalIntegerParam) ? m.PatientId.Equals(patientInsuranceQuery.PatientId) : true) &&
            (!patientInsuranceQuery.InsuranceId.Equals(CommonInteger.OptionalIntegerParam) ? m.InsuranceId.Equals(patientInsuranceQuery.InsuranceId) : true));
        }


        /// <summary>
        /// Generic query expression for Account service
        /// </summary>
        /// <param name="loginDto">loginDto contains information of the login modle sent in request</param>
        /// <returns>Func delegate to return to the Entity framework of type UserPassword,bool</returns>
        public static Func<UserPassword, bool> UserPassword(LoginDto loginDto, int userId)
        {
            return new Func<UserPassword, bool>(m => m.Password.Equals(loginDto.LoginPassword) && m.UserId.Equals(userId) && m.Status.Equals(true));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="loginDto">loginDto contains information of the login modle sent in request</param>
        /// <returns>Func delegate to return to the Entity framework of type UserPassword,bool</returns>
        public static Func<User, bool> UserHandle(LoginDto loginDto)
        {
            return new Func<User, bool>(m => m.Handle.Equals(loginDto.LoginHandle));
        }
    }
}
