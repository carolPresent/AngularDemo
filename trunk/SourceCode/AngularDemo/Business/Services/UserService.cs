﻿using Business.Constants;
using Business.Mapper;
using Business.Utilities;
using Data.UnitOfWork;
using DataTransferObject.Constants;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;

namespace Business.Services
{
    /// <summary>
    /// Business layer class for user.
    /// </summary>
    public class UserService
    {
        /// <summary>
        /// Method to get user from database based on user query.
        /// </summary>
        /// <param name="userQuery"></param>
        /// <returns></returns>
        public ResponseModel Get(UserQuery userQuery)
        {
            using (var unitOfWork = new UnitOfWork())
            {
                if (userQuery == null)
                    userQuery = new UserQuery(name: CommonString.OptionalStringParam, userId: CommonString.OptionalStringParam);

                userQuery.SetTypedVariables();
                var result = unitOfWork.Users.FindAll(QueryExpressions.User(userQuery));
                return ReturnStatements.SuccessResponse(CollectionConversions.ListUser(result));
            }
        }

        /// <summary>
        /// Method to add user to database.
        /// </summary>
        /// <param name="newUserDto"></param>
        /// <returns></returns>
        public ResponseModel Add(UserDto newUserDto)
        {
            var validationStatus = ValidateRequest.ValidateUserDto(newUserDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);

            newUserDto = validationStatus.Second;
            using (var unitOfWork = new UnitOfWork())
            {
                var checkIfUserAlreadyExist = unitOfWork.UserPasswords.Find(m => m.DF_UserPasswords_UserId.Equals(newUserDto.UserId)) != null;

                if (checkIfUserAlreadyExist)
                    return ReturnStatements.BadRequestResponse(Strings.UserAlreadyExist);

                var dbUser = DtoToDatabase.User(newUserDto);
                unitOfWork.Users.Add(dbUser);
                var saveResponse = unitOfWork.Complete();

                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(newUserDto));

                //Save credentials
                var loginDto = new LoginDto(loginId: newUserDto.UserId, loginPassword: newUserDto.UserPassword);
                var dbUserPassword = DtoToDatabase.UserPassword(loginDto, dbUser.PK_Users);
                unitOfWork.UserPasswords.Add(dbUserPassword);
                saveResponse = unitOfWork.Complete();

                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(loginDto));

                return ReturnStatements.SuccessResponse(DynamicListForResponse.Create(loginDto));
            }
        }

        /// <summary>
        /// Method for checking login credentials for user.
        /// </summary>
        /// <param name="loginDto"></param>
        /// <returns></returns>
        public ResponseModel Login(LoginDto loginDto)
        {
            using (var unitOfWork = new UnitOfWork())
            {
                var userInfo = unitOfWork.UserPasswords.Find(QueryExpressions.UserLogin(loginDto));

                if (userInfo == null)
                    return ReturnStatements.FailedLogin();

                return ReturnStatements.SuccessLogin(userInfo.FK_UserPasswords_Users);
            }
        }
    }
}