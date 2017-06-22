﻿using Business.Constants;
using Business.Mapper;
using Business.Utilities;
using Data.UnitOfWork;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;
using DataTransferObject.Constants;

namespace Business.Services
{
    /// <summary>
    /// Business layer class for insurance.
    /// </summary>
    public class InsuranceService
    {
        /// <summary>
        /// Method to get insurance from database based on user query.
        /// </summary>
        /// <param name="insuranceQuery"></param>
        /// <returns></returns>
        public ResponseModel Get(InsuranceQuery insuranceQuery)
        {
            using (var unitOfWork = new UnitOfWork())
            {
                if (insuranceQuery == null)
                    insuranceQuery = new InsuranceQuery(id: CommonString.OptionalStringParamInteger, name: CommonString.OptionalStringParam, phoneNumber: CommonString.OptionalStringParam, pubId: CommonString.OptionalStringParam);

                insuranceQuery.SetTypedVariables();
                var result = unitOfWork.Insurances.FindAll(QueryExpressions.Insurance(insuranceQuery));
                return ReturnStatements.SuccessResponse(CollectionConversions.ListInsurance(result));
            }
        }

        /// <summary>
        /// Method to add insurance to database.
        /// </summary>
        /// <param name="newInsuranceDto"></param>
        /// <returns></returns>
        public ResponseModel Add(InsuranceDto newInsuranceDto)
        {
            var validationStatus = ValidateRequest.ValidateInsuranceDto(newInsuranceDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);

            newInsuranceDto = validationStatus.Second;
            using (var unitOfWork = new UnitOfWork())
            {
                var dbInsurance = DtoToDatabase.Insurance(newInsuranceDto);
                unitOfWork.Insurances.Add(dbInsurance);
                var saveResponse = unitOfWork.Complete();

                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(newInsuranceDto));

                return ReturnStatements.SuccessResponse(DynamicListForResponse.Create(newInsuranceDto));
            }
        }
    }
}
