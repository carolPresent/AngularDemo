using Data;
using DataTransferObject.Models;

namespace Business.Mapper
{
    /// <summary>
    /// Class to convert Database's object to Dto objects
    /// Since project is covering small number of classes in database , DTO's are mapped manually.
    /// When number of classes increase we can use third party package such as AutoMapper.
    /// </summary>
    internal class DatabaseToDto
    {
        /// <summary>
        /// Maps Data.Patient to DataTransferObjects.PatientDto
        /// </summary>
        /// <param name="patient">patient containing information of a patient stored in database</param>
        /// <returns>PatientDto mapped from Data.Patient</returns>
        public static PatientDto Patient(Patient patient)
        {
            return new PatientDto
            {
                Id=patient.PK_Patients,
                Address = patient.DF_Patients_Address,
                Age = patient.DF_Patients_Age,
                FirstName = patient.DF_Patients_FirstName,
                Gender = patient.DF_Patients_Gender,
                LastName = patient.DF_Patients_LastName,
                MiddleName = patient.DF_Patients_MiddleName,
                PhoneNumber = patient.DF_Patients_Phone
            };
        }

        /// <summary>
        /// Maps Data.Insurance to DataTransferObjects.InsuranceDto
        /// </summary>
        /// <param name="insurance">insurance containing information of an insurance stored in database</param>
        /// <returns>InsuranceDto mapped from Data.Insurance</returns>
        public static InsuranceDto Insurance(Insurance insurance)
        {
            return new InsuranceDto
            {
                Id=insurance.PK_Insurances,
                Address = insurance.DF_Insurances_Address,
                Name = insurance.DF_Insurances_Name,
                PhoneNumber = insurance.DF_Insurances_Phone,
                InsurancePublicId=insurance.DF_Insurances_PublicId
            };
        }

        /// <summary>
        /// Maps Data.User to DataTransferObjects.UserDto
        /// </summary>
        /// <param name="user">user containing information of a user stored in database</param>
        /// <returns>UserDto mapped from Data.User</returns>
        public static UserDto User(User user)
        {
            return new UserDto
            {
                FirstName = user.DF_Users_FirstName,
                MiddleName = user.DF_Users_MiddleName,
                LastName = user.DF_Users_LastName
            };
        }

        /// <summary>
        /// Maps Pair of {Data.Patient and Data.Insurance} to DataTransferObjects.PatientInsuranceDto
        /// </summary>
        /// <param name="patientInsurance">patientInsurance containing information of a patientInsurance stored in database</param>
        /// <returns>PatientInsuranceDto mapped from Data.Patient</returns>
        public static PatientInsuranceDto PatientInsurance(Pair patientInsurance)
        {
            var patient = patientInsurance.First;
            var insurance = patientInsurance.Second;
            return new PatientInsuranceDto
            {
                InsuranceInfo = Insurance(insurance),
                PatientInfo = Patient(patient)
            };
        }
    }
}
