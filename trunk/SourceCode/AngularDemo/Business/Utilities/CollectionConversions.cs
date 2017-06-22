using Business.Mapper;
using Data;
using DataTransferObject.Models;
using System.Collections.Generic;
using System.Linq;

namespace Business.Utilities
{
    /// <summary>
    /// Converts collection objects of DTO to Database and vice versa.
    /// </summary>
    internal class CollectionConversions
    {
        /// <summary>
        /// Method to convert list of Database Patient to list of DTO Insurance.
        /// </summary>
        /// <param name="patientList"></param>
        /// <returns></returns>
        public static List<PatientDto> ListPatient(List<Patient> patientList)
        {
            return patientList.Select(DatabaseToDto.Patient).ToList();
        }

        /// <summary>
        /// Method to convert list of Database Insurance to list of DTO Insurance.
        /// </summary>
        /// <param name="insuranceList"></param>
        /// <returns></returns>
        public static List<InsuranceDto> ListInsurance(List<Insurance> insuranceList)
        {
            return insuranceList.Select(DatabaseToDto.Insurance).ToList();
        }

        /// <summary>
        /// Method to convert list of Database User to list of DTO User.
        /// </summary>
        /// <param name="userList"></param>
        /// <returns></returns>
        public static List<UserDto> ListUser(List<User> userList)
        {
            return userList.Select(DatabaseToDto.User).ToList();
        }

        /// <summary>
        /// Method to convert list of Database PatientInsurance to list of DTO PatientInsurance.
        /// </summary>
        /// <param name="patientInsuranceList"></param>
        /// <returns></returns>
        public static List<PatientInsuranceDto> ListPatientInsuranceToDto(List<Pair> patientInsuranceList)
        {
            return patientInsuranceList.Select(DatabaseToDto.PatientInsurance).ToList();
        }

        /// <summary>
        /// Method to convert list of DTO PatientInsurance to list of Database PatientInsurance.
        /// </summary>
        /// <param name="patientInsuranceList"></param>
        /// <returns></returns>
        public static List<PatientInsurance> ListPatientInsuranceToDatabase(List<Pair> patientInsuranceList)
        {
            return patientInsuranceList.Select(DtoToDatabase.PatientInsurance).ToList();
        }
    }
}
