using Business.Constants;
using Business.Mapper;
using Business.Utilities;
using Data.UnitOfWork;
using DataTransferObject.Constants;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;

namespace Business.Services
{
    /// <summary>
    /// Business layer class for patient.
    /// </summary>
    public class PatientService
    {
        /// <summary>
        /// Method to get patient from database based on user query.
        /// </summary>
        /// <param name="patientQuery"></param>
        /// <returns></returns>
        public ResponseModel Get(PatientQuery patientQuery)
        {
            using (var unitOfWork = new UnitOfWork())
            {
                if (patientQuery == null)
                    patientQuery = new PatientQuery(id: CommonString.OptionalStringParamInteger, name: CommonString.OptionalStringParam, phoneNumber: CommonString.OptionalStringParam);
                patientQuery.SetTypedVariables();
                var result = unitOfWork.Patients.FindAll(QueryExpressions.Patient(patientQuery));
                return ReturnStatements.SuccessResponse(CollectionConversions.ListPatient(result));
            }
        }

        /// <summary>
        /// Method to add patient to database.
        /// </summary>
        /// <param name="newPatientDto"></param>
        /// <returns></returns>
        public ResponseModel Add(PatientDto newPatientDto)
        {
            var validationStatus = ValidateRequest.ValidatePatientDto(newPatientDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);

            newPatientDto = validationStatus.Second;
            using (var unitOfWork = new UnitOfWork())
            {
                var dbPatient = DtoToDatabase.Patient(newPatientDto);
                unitOfWork.Patients.Add(dbPatient);
                var saveResponse = unitOfWork.Complete();
                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(newPatientDto));
                return ReturnStatements.SuccessResponse(DynamicListForResponse.Create(newPatientDto));
            }
        }
    }
}
