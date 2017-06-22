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
    /// Business layer class for user. The class interacts with Data layer to perform CRUD operations on Users.
    /// </summary>
    public class UserService
    {
        /// <summary>
        /// Method to add user to database.
        /// </summary>
        /// <param name="newUserDto">newUserDto contains personal information of user and user id and password.</param>
        /// <returns>ResponseModel of user addition in database.</returns>
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
                return AddLoginDetails(loginDto, dbUser.PK_Users);
            }
        }

        /// <summary>
        /// Private class to add login details of a new user.
        /// </summary>
        /// <param name="loginDto"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        private ResponseModel AddLoginDetails(LoginDto loginDto, int userId)
        {
            var dbUserPassword = DtoToDatabase.UserPassword(loginDto, userId);
            using (var unitOfWork = new UnitOfWork())
            {
                unitOfWork.UserPasswords.Add(dbUserPassword);
                var saveResponse = unitOfWork.Complete();

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
