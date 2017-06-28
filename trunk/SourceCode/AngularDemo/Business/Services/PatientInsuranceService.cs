using Business.Constants;
using Business.Mapper;
using Business.Utilities;
using Data;
using Data.UnitOfWork;
using DataTransferObject.Constants;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;
using System.Collections.Generic;
using System.Linq;

namespace Business.Services
{
    /// <summary>
    /// Business layer class of patient insurance. Interacts with the Data layer to perform CRUD operations on patient insurances.
    /// </summary>
    public class PatientInsuranceService
    {
        /// <summary>
        /// Method to get patient insurance from database based on user query.
        /// </summary>
        /// <param name="patientInsuranceQuery">patientInsuranceQuery containing query to get PatientInsuranceDto from database</param>
        /// <returns>ResponseModel containing list of PatientInsuranceDto</returns>
        public ResponseModel Get(PatientInsuranceQuery patientInsuranceQuery)
        {
            using (var unitOfWork = new UnitOfWork())
            {
                if (patientInsuranceQuery == null)
                    patientInsuranceQuery = new PatientInsuranceQuery(patientId: CommonString.OptionalStringParamInteger, insuranceId: CommonString.OptionalStringParamInteger);
                patientInsuranceQuery.SetTypedVariables();
                var result = unitOfWork.PatientInsurances.FindOnConstraint(QueryExpressions.PatientInsurance(patientInsuranceQuery), prop => prop.Insurance, prop => prop.Patient).ToList();
                result = result.OrderByDescending(m => m.Id).ToList();
                return ReturnStatements.SuccessResponse(CollectionConversions.ListPatientInsuranceToDto(ConvertPatientInsuranceToPairList(result)));
            }
        }

        /// <summary>
        /// Method to add patient insurance to database.
        /// </summary>
        /// <param name="newpatientInsurance">newpatientInsurance containing required information of patient insurance</param>
        /// <param name="userId">userId is the id of the logged in user who made the request to add a patient insurance</param>
        /// <returns>HttpResponseMessage containing addition status of patient insurance</returns>
        public ResponseModel Add(AddPatientInsurance newPatientInsurance, int userId)
        {
            var validationStatus = ValidateRequest.ValidatePatientInsuranceDto(newPatientInsurance);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);
            newPatientInsurance = validationStatus.Second;
            using (var unitOfWork = new UnitOfWork())
            {
                var dbPatientInsurance = DtoToDatabase.PatientInsurance(new Pair { First = newPatientInsurance, Second = userId });
                unitOfWork.PatientInsurances.Add(dbPatientInsurance);
                var saveResponse = unitOfWork.Complete();
                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(newPatientInsurance));
                return ReturnStatements.SuccessResponse(DynamicListForResponse.Create(newPatientInsurance));
            }
        }

        /// <summary>
        /// Private method for converting list PatientInsurance to a list of pair. First contains patient, Second contains insurance
        /// </summary>
        /// <param name="patientInsuranceList"></param>
        /// <returns></returns>
        private List<Pair> ConvertPatientInsuranceToPairList(List<PatientInsurance> patientInsuranceList)
        {
            var returnItem = new List<Pair>();

            foreach (var patientInsurance in patientInsuranceList)
                returnItem.Add(new Pair
                {
                    First = new Pair { First = patientInsurance.Patient, Second = patientInsurance.Insurance },
                    Second = patientInsurance.Id
                });

            return returnItem;
        }

        /// <summary>
        /// Method in business layer to modify an old patient insurance
        /// </summary>
        /// <param name="oldPatientInsurance">oldPatientInsurance contains the information required to update an old patient insurance</param>
        /// <param name="userId">userId is the id of the user who is creating changes to the patient insurance</param>
        /// <returns>ResponseModel that contains the response of modifying a patient insurance in the database</returns>
        public ResponseModel Update(AddPatientInsurance oldPatientInsurance, int userId)
        {
            var validationStatus = ValidateRequest.ValidatePatientInsuranceDto(oldPatientInsurance);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);
            oldPatientInsurance = validationStatus.Second;
            using (var unitOfWork = new UnitOfWork())
            {
                var findPatientInsurance = unitOfWork.PatientInsurances.Find(m => m.Id.Equals(oldPatientInsurance.Id));

                if (findPatientInsurance == null)
                    return ReturnStatements.FailedResponse(Strings.NoPatientInusranceFound);
                if (!findPatientInsurance.UserId.Equals(userId))
                    return ReturnStatements.FailedResponse(Strings.Unauthorized);
                findPatientInsurance = MapForUpdate(oldPatientInsurance, findPatientInsurance);
                unitOfWork.PatientInsurances.Update(findPatientInsurance);
                var saveResponse = unitOfWork.Complete();
                return Functions.ReturnGeneric(saveResponse, Strings.SuccessfullModification, Strings.UnsuccessfullModification);
            }
        }

        /// <summary>
        /// Private method to map old patient insurance to the associated Data.PatienInsurance field in database.
        /// </summary>
        /// <param name="oldPatientInsuranceDto">oldPatientInsurance contains the information required to update an old patient insurance</param>
        /// <param name="patientInsurance">patientInsurance is the database row of patient insurance which need to be updated by mapping from old patient insurance</param>
        /// <returns>PatientInsurance is the updates/mapped database row</returns>
        private PatientInsurance MapForUpdate(AddPatientInsurance oldPatientInsuranceDto, PatientInsurance patientInsurance)
        {
            patientInsurance.CreationDate = Functions.GetCurrentDate();
            patientInsurance.CreationTime = Functions.GetCurrentTime();
            patientInsurance.InsuranceId = oldPatientInsuranceDto.InsuranceId;
            patientInsurance.PatientId = oldPatientInsuranceDto.PatientId;
            return patientInsurance;
        }
    }
}
