using Business.Utilities;
using Data;
using DataTransferObject.Models;

namespace Business.Mapper
{
    /// <summary>
    /// /// <summary>
    /// Class to convert Dto's to Database objects
    /// Since project is covering small number of classes in database , DTO's are mapped manually.
    /// When number of classes increase we can use third party package such as AutoMapper.
    /// </summary>
    /// </summary>
    internal class DtoToDatabase
    {
        /// <summary>
        /// Maps a DataTransferObject.PatientDto to Data.Patient
        /// </summary>
        /// <param name="patient">patient containing information of a patient</param>
        /// <returns>Data.Patient having information mapped from DataTransferObject.PatientDto</returns>
        public static Patient Patient(PatientDto patient)
        {
            return new Patient
            {
                DF_Patients_Address = patient.Address,
                DF_Patients_Age = patient.Age,
                DF_Patients_FirstName = patient.FirstName,
                DF_Patients_Gender = patient.Gender,
                DF_Patients_LastName = patient.LastName,
                DF_Patients_MiddleName = patient.MiddleName,
                DF_Patients_Phone = patient.PhoneNumber
            };
        }

        /// <summary>
        /// Maps a DataTransferObject.InsuranceDto to Data.Insurance
        /// </summary>
        /// <param name="insurance">insurance containing information of a insurance</param>
        /// <returns>Data.Insurance having information mapped from DataTransferObject.InsuranceDto</returns>
        public static Insurance Insurance(InsuranceDto insurance)
        {
            return new Insurance
            {
                DF_Insurances_Address = insurance.Address,
                DF_Insurances_Name = insurance.Name,
                DF_Insurances_Phone = insurance.PhoneNumber,
                DF_Insurances_PublicId=insurance.InsurancePublicId
            };
        }

        /// <summary>
        /// Maps a DataTransferObject.UserDto to Data.User
        /// </summary>
        /// <param name="user">user containing information of a user</param>
        /// <returns>Data.User having information mapped from DataTransferObject.UserDto</returns>
        public static User User(UserDto user)
        {
            return new User
            {
                DF_Users_FirstName = user.FirstName,
                DF_Users_LastName = user.LastName,
                DF_Users_MiddleName = user.MiddleName,
                DF_Users_CreationDate=Functions.GetCurrentDate(),
                DF_Users_CreationTime=Functions.GetCurrentTime()
            };
        }

        /// <summary>
        /// Maps a Pair of {DataTransferObject.PatientDto,userId} to Data.PatientInsurance
        /// userId is the id of the user fetched from api using its Utilities.UserIdentity.GetUserId() method
        /// </summary>
        /// <param name="patientInsurance">patientInsurance containing information of a patientInsurance</param>
        /// <returns>Data.PatientInsurance having information mapped from Pair of {DataTransferObject.PatientDto,userId}</returns>
        public static PatientInsurance PatientInsurance(Pair patientInsurance)
        {
            //patientInsurance Pair's First value contains PatientDto and Second value contains userId who is adding the patient insurance
            var addPatientInsurance = patientInsurance.First;
            var userId = patientInsurance.Second;
            return new PatientInsurance
            {
                FK_PatientInsurances_Insurances = addPatientInsurance.InsuranceId,
                FK_PatientInsurances_Patients = addPatientInsurance.PatientId,
                FK_PatientInsurances_Users = userId,
                DF_PatientInsurances_CreationDate = Functions.GetCurrentDate(),
                DF_PatientInsurances_CreationTime = Functions.GetCurrentTime(),
            };
        }

        /// <summary>
        /// Maps a DataTransferObject.LoginDto to Data.UserPassword.
        /// Uses userId as foreign key for Data.User table.
        /// </summary>
        /// <param name="loginDto">loginDto contains public userId and userPassword of new user.</param>
        /// <param name="userId">userId of user from Data.User table</param>
        /// <returns>Data.UserPassword having information mapped from DataTransferObject.LoginDto</returns>
        public static UserPassword UserPassword(LoginDto loginDto,int userId)
        {
            return new UserPassword
            {
                DF_UserPasswords_UserId = loginDto.LoginId,
                DF_UserPasswords_UserPassword = loginDto.LoginPassword,
                FK_UserPasswords_Users = userId
            };
        }
    }
}
