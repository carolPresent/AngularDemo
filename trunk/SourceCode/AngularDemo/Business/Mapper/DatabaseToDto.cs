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
                Id=patient.Id,
                Address = patient.Address,
                Age = patient.Age,
                FirstName = patient.FirstName,
                Gender = patient.Gender,
                LastName = patient.LastName,
                MiddleName = patient.MiddleName,
                PhoneNumber = patient.Phone,
                EmailId=patient.EmailId
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
                Id=insurance.Id,
                Address = insurance.Address,
                Name = insurance.Name,
                PhoneNumber = insurance.Phone,
                InsurancePublicId=insurance.PublicId
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
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName
            };
        }

        /// <summary>
        /// Maps Pair of {Pair of {Data.Patient and Data.Insurance},Data.PatientInsurance.Id} to DataTransferObjects.PatientInsuranceDto
        /// </summary>
        /// <param name="patientInsurance">patientInsurance containing information of a patientInsurance stored in database</param>
        /// <returns>PatientInsuranceDto mapped from Data.Patient</returns>
        public static PatientInsuranceDto PatientInsurance(Pair patientInsurance)
        {
            var patient = patientInsurance.First.First;
            var insurance = patientInsurance.First.Second;
            var patientInsuranceId = patientInsurance.Second;
            return new PatientInsuranceDto
            {
                InsuranceInfo = Insurance(insurance),
                PatientInfo = Patient(patient),
                Id= patientInsuranceId
            };
        }
    }
}
