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
        /// <param name="patientList">patientList is the list of Data.Patient to be converted.</param>
        /// <returns>List of PatientDto mapped from list argument</returns>
        public static List<PatientDto> ListPatient(List<Patient> patientList)
        {
            return patientList.Select(DatabaseToDto.Patient).ToList();
        }

        /// <summary>
        /// Method to convert list of Database Insurance to list of DTO Insurance.
        /// </summary>
        /// <param name="insuranceList">insuranceList is the list of Data.Insurance to be converted.</param>
        /// <returns>List of InsuranceDto mapped from list argument</returns>
        public static List<InsuranceDto> ListInsurance(List<Insurance> insuranceList)
        {
            return insuranceList.Select(DatabaseToDto.Insurance).ToList();
        }

        /// <summary>
        /// Method to convert list of Database PatientInsurance to list of DTO PatientInsurance.
        /// </summary>
        /// <param name="patientInsuranceList">patientList is the list of Pair of {Data.PatientData.Insurance} to be converted.</param>
        /// <returns>List of PatientInsuranceDto mapped from list argument</returns>
        public static List<PatientInsuranceDto> ListPatientInsuranceToDto(List<Pair> patientInsuranceList)
        {
            return patientInsuranceList.Select(DatabaseToDto.PatientInsurance).ToList();
        }

        /// <summary>
        /// Method to convert list of Pair of {DataTransferObject.Patient,DataTransferObject.Insurance} 
        /// to list of Database PatientInsurance.
        /// </summary>
        /// <param name="patientInsuranceList">patientList is the list of Pair of {DataTransferObject.Patient,DataTransferObject.Insurance}  to be converted.</param>
        /// <returns>List of PatientInsurance mapped from list argument</returns>
        public static List<PatientInsurance> ListPatientInsuranceToDatabase(List<Pair> patientInsuranceList)
        {
            return patientInsuranceList.Select(DtoToDatabase.PatientInsurance).ToList();
        }
    }
}
