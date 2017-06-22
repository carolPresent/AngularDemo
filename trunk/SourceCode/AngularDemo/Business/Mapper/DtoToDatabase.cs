using Business.Utilities;
using Data;
using DataTransferObject.Models;

namespace Business.Mapper
{
    /// <summary>
    /// /// <summary>
    /// Since project is covering small number of classes in database , DTO's are mapped manually.
    /// When number of classes increase we can use third party package such as AutoMapper.
    /// </summary>
    /// </summary>
    internal class DtoToDatabase
    {
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

        public static PatientInsurance PatientInsurance(Pair patientInsurance)
        {
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
