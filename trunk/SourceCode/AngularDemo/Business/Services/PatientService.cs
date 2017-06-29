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
    /// Business layer class for patient. Interacts with the Data layer to perform CRUD operations on Patients.
    /// </summary>
    public class PatientService
    {
        /// <summary>
        /// Method to get patient from database based on user query.
        /// </summary>
        /// <param name="patientQuery">patientQuery contains query model to get patient from database</param>
        /// <returns>ResponseModel containing list of PatientDto</returns>
        public ResponseModel Get(PatientQuery patientQuery)
        {
            using (var unitOfWork = new UnitOfWork())
            {
                //Creating a parameter less query model if it is null from request
                if (patientQuery == null)
                    patientQuery = new PatientQuery(id: CommonString.OptionalStringParamInteger, name: CommonString.OptionalStringParam, phoneNumber: CommonString.OptionalStringParam);

                patientQuery.SetTypedVariables();
                var result = unitOfWork.Patients.FindAll(QueryExpressions.Patient(patientQuery));
                result = result.OrderByDescending(m => m.Id).ToList();
                return ReturnStatements.SuccessResponse(CollectionConversions.ListPatient(result));
            }
        }

        /// <summary>
        /// Method to add patient to database.
        /// </summary>
        /// <param name="newPatientDto">newPatientDto contains information of patient to be added.</param>
        /// <returns>ResponseModel containing patient addition status</returns>
        public ResponseModel Add(PatientDto newPatientDto, int userId)
        {
            var validationStatus = ValidateRequest.ValidatePatientDto(newPatientDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);

            newPatientDto = validationStatus.Second;

            using (var unitOfWork = new UnitOfWork())
            {
                var dbPatient = DtoToDatabase.Patient(newPatientDto, userId);
                unitOfWork.Patients.Add(dbPatient);
                var saveResponse = unitOfWork.Complete();

                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(newPatientDto));

                SendMail(newPatientDto);
                return ReturnStatements.SuccessResponse(DynamicListForResponse.Create(newPatientDto));
            }
        }

        /// <summary>
        /// Method to update an old patient.
        /// </summary>
        /// <param name="oldPatientDto">oldPatientDto contains information of patient to be modified.</param>
        /// <returns>ResponseModel regarding the modification status of the patient</returns>
        public ResponseModel Update(PatientDto oldPatientDto, int userId)
        {
            var validationStatus = ValidateRequest.ValidatePatientDto(oldPatientDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);

            oldPatientDto = validationStatus.Second;

            using (var unitOfWork = new UnitOfWork())
            {
                var findPatient = unitOfWork.Patients.Find(m => m.Id.Equals(oldPatientDto.Id));

                if (findPatient == null)
                    return ReturnStatements.FailedResponse(Strings.NoPatientFound);

                if (!findPatient.UserId.Equals(userId))
                    return ReturnStatements.FailedResponse(Strings.Unauthorized);

                findPatient = MapForUpdate(oldPatientDto, findPatient);
                unitOfWork.Patients.Update(findPatient);
                var saveResponse = unitOfWork.Complete();
                return Functions.ReturnGeneric(saveResponse, Strings.SuccessfullModification, Strings.UnsuccessfullModification);
            }
        }

        /// <summary>
        /// Private method to return Data.Patient afater mapping it from update model from request.
        /// </summary>
        /// <param name="oldPatientDto">oldPatientDto contains the data associated to modifications done</param>
        /// <param name="patientToUpdate">patientToUpdate contains the data table to be updated</param>
        /// <returns>Patient mapped from oldPatienDtos</returns>
        private Patient MapForUpdate(PatientDto oldPatientDto, Patient patientToUpdate)
        {
            patientToUpdate.Age = oldPatientDto.Age;
            patientToUpdate.Address = oldPatientDto.Address;
            patientToUpdate.CreationDate = Functions.GetCurrentDate();
            patientToUpdate.CreationTime = Functions.GetCurrentTime();
            patientToUpdate.FirstName = oldPatientDto.FirstName;
            patientToUpdate.Gender = oldPatientDto.Gender;
            patientToUpdate.MiddleName = oldPatientDto.MiddleName;
            patientToUpdate.LastName = oldPatientDto.LastName;
            patientToUpdate.Phone = oldPatientDto.PhoneNumber;
            return patientToUpdate;
        }

        /// <summary>
        /// Send email to patient in case of successfull registration.
        /// </summary>
        /// <param name="patientDto">patientDto is the information model for patient.</param>
        private void SendMail(PatientDto patientDto)
        {
            var emailList = new List<string>();
            emailList.Add(patientDto.EmailId);
            var emailDto = new EmailServiceDto(Strings.PatientRegisteredSubject, Functions.CreateMailBody(patientDto.EmailId, patientDto.FirstName), Strings.UserEmailId, Strings.UserEmailPassword, emailList, Strings.SmtpServer, Integers.PortNumberForEmail, true);
            var emailer = new EmailSender(emailDto);
            emailer.Send();

            using (var unitOfWork = new UnitOfWork())
            {
                unitOfWork.EmailLogs.Add(DtoToDatabase.EmailLog(emailDto, true));
                unitOfWork.Complete();
            }
        }
    }
}
