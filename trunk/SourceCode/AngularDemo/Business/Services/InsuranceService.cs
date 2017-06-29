using Business.Constants;
using Business.Mapper;
using Business.Utilities;
using Data;
using Data.UnitOfWork;
using DataTransferObject.Constants;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;
using System.Linq;

namespace Business.Services
{
    /// <summary>
    /// Business layer class for insurance. Interacts with Data layer for CRUD operations.
    /// </summary>
    public class InsuranceService
    {
        /// <summary>
        /// Method to get insurance from database based on user query.
        /// </summary>
        /// <param name="insuranceQuery">insuranceQuery contains query parameters to get insurances.</param>
        /// <returns>ResponseModel containing list of InsuranceDto.</returns>
        public ResponseModel Get(InsuranceQuery insuranceQuery)
        {
            using (var unitOfWork = new UnitOfWork())
            {
                //Creating a parameter less query model if it is null from request
                if (insuranceQuery == null)
                    insuranceQuery = new InsuranceQuery(id: CommonString.OptionalStringParamInteger, name: CommonString.OptionalStringParam, phoneNumber: CommonString.OptionalStringParam, pubId: CommonString.OptionalStringParam);
                insuranceQuery.SetTypedVariables();
                var result = unitOfWork.Insurances.FindAll(QueryExpressions.Insurance(insuranceQuery));
                result = result.OrderByDescending(m => m.Id).ToList();
                return ReturnStatements.SuccessResponse(CollectionConversions.ListInsurance(result));
            }
        }

        /// <summary>
        /// Method to add insurance to database.
        /// </summary>
        /// <param name="newInsuranceDto">newInsuranceDto contains information of an insurance to add in database.</param>
        /// <returns>ResponseModel of addition of insurance in database.</returns>
        public ResponseModel Add(InsuranceDto newInsuranceDto, int userId)
        {
            var validationStatus = ValidateRequest.ValidateInsuranceDto(newInsuranceDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);

            newInsuranceDto = validationStatus.Second;

            using (var unitOfWork = new UnitOfWork())
            {
                var dbInsurance = DtoToDatabase.Insurance(newInsuranceDto, userId);
                unitOfWork.Insurances.Add(dbInsurance);
                var saveResponse = unitOfWork.Complete();

                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(newInsuranceDto));

                return ReturnStatements.SuccessResponse(DynamicListForResponse.Create(newInsuranceDto));
            }
        }

        /// <summary>
        /// Method to update an old insurance by accepting an oldInsuranceDto
        /// </summary>
        /// <param name="oldInsuranceDto">oldInsuranceDto contains the data to be updated/modified</param>
        /// <param name="userId">userId is the id of the user who has made the request</param>
        /// <returns>ResponseModel of the modification status of the insurance in database</returns>
        public ResponseModel Update(InsuranceDto oldInsuranceDto, int userId)
        {
            var validationStatus = ValidateRequest.ValidateInsuranceDto(oldInsuranceDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);

            oldInsuranceDto = validationStatus.Second;

            using (var unitOfWork = new UnitOfWork())
            {
                var findInsurance = unitOfWork.Insurances.Find(m => m.Id.Equals(oldInsuranceDto.Id));

                if (findInsurance == null)
                    return ReturnStatements.FailedResponse(Strings.NoInusranceFound);

                if (!findInsurance.UserId.Equals(userId))
                    return ReturnStatements.FailedResponse(Strings.Unauthorized);

                findInsurance = MapForUpdate(oldInsuranceDto, findInsurance);
                unitOfWork.Insurances.Update(findInsurance);
                var saveResponse = unitOfWork.Complete();
                return Functions.ReturnGeneric(saveResponse, Strings.SuccessfullModification, Strings.UnsuccessfullModification);
            }
        }

        /// <summary>
        /// Private method to map an existing Data.Insurance from modified oldInsuranceDto from request
        /// </summary>
        /// <param name="oldInsuranceDto">oldInsuranceDto contains the new information that are to be added in the system</param>
        /// <param name="insuranceToUpdate">insuranceToUpdate is the insurance field to be mapped from the oldInsuranceDto received in the request</param>
        /// <returns>Insurance afeter mapping is done from oldInsuranceDto</returns>
        private Insurance MapForUpdate(InsuranceDto oldInsuranceDto, Insurance insuranceToUpdate)
        {
            insuranceToUpdate.Address = oldInsuranceDto.Address;
            insuranceToUpdate.CreationDate = Functions.GetCurrentDate();
            insuranceToUpdate.CreationTime = Functions.GetCurrentTime();
            insuranceToUpdate.Name = oldInsuranceDto.Name;
            insuranceToUpdate.Phone = oldInsuranceDto.PhoneNumber;
            return insuranceToUpdate;
        }
    }
}
