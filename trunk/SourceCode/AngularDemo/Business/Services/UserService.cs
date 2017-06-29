using Business.Constants;
using Business.Mapper;
using Business.Utilities;
using Data.UnitOfWork;
using DataTransferObject.Models;
using System.Collections.Generic;
using System.Linq;

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
                var checkIfUserAlreadyExist = unitOfWork.Users.Find(m => m.Handle.Equals(newUserDto.Handle) || m.EmailId.Equals(newUserDto.EmailId)) != null;

                if (checkIfUserAlreadyExist)
                    return ReturnStatements.BadRequestResponse(Strings.UserAlreadyExist);
                var dbUser = DtoToDatabase.User(newUserDto);
                unitOfWork.Users.Add(dbUser);
                var saveResponse = unitOfWork.Complete();

                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(newUserDto));
                //Save credentials
                var loginDto = new LoginDto(loginHandle: newUserDto.Handle, loginPassword: newUserDto.Password);
                return AddLoginDetails(loginDto, dbUser.Id, dbUser.VerificationCode, dbUser.EmailId);
            }
        }

        /// <summary>
        /// Private class to add login details of a new user.
        /// </summary>
        /// <param name="loginDto">loginDto contains login detail of a new user trying to log in.</param>
        /// <param name="userId">userId is the Foreign Key used for adding a new password</param>
        /// <param name="emailId">emailId is the email id of the user who is registering himself on the system</param>
        /// <param name="verificationCode">verificationCode is the code to send to the user. It is always 6 digits.</param>
        /// <returns>ResponseModel associated to the addition response of user login details</returns>
        private ResponseModel AddLoginDetails(LoginDto loginDto, int userId, string verificationCode, string emailId)
        {
            var dbUserPassword = DtoToDatabase.UserPassword(loginDto, userId);
            using (var unitOfWork = new UnitOfWork())
            {
                unitOfWork.UserPasswords.Add(dbUserPassword);
                var saveResponse = unitOfWork.Complete();

                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(loginDto));
                SendMail(loginDto.LoginHandle, verificationCode, emailId, false);
                return ReturnStatements.SuccessResponse(DynamicListForResponse.Create(loginDto));
            }
        }

        /// <summary>
        /// Private method to send a verification email to a new user.
        /// </summary>
        /// <param name="loginDto">loginDto contains login detail of a new user trying to log in.</param>
        /// <param name="emailId">emailId is the email id of the user who is registering himself on the system</param>
        /// <param name="verificationCode">verificationCode is the code to send to the user. It is always 6 digits.</param>
        private void SendMail(string handle, string verificationCode, string emailId, bool isForgotPasswordMail)
        {
            var emailList = new List<string>();
            emailList.Add(emailId);
            var mailSubject = Strings.SuccessfullRegistrationSubject;
            var mailBody = Functions.CreateMailBody(handle, emailId, verificationCode);

            if (isForgotPasswordMail)
            {
                mailBody = Functions.CreateMailBodyForgotPassword(handle, verificationCode, emailId);
                mailSubject = Strings.ForgotPasswordRequest;
            }
            var emailDto = new EmailServiceDto(mailSubject, mailBody, Strings.UserEmailId, Strings.UserEmailPassword, emailList, Strings.SmtpServer, Integers.PortNumberForEmail, true);
            var emailer = new EmailSender(emailDto);
            var emailSentStatus = emailer.Send();
            using (var unitOfWork = new UnitOfWork())
            {
                unitOfWork.EmailLogs.Add(DtoToDatabase.EmailLog(emailDto, emailSentStatus));
                unitOfWork.Complete();
            }
        }

        /// <summary>
        /// Method for checking login credentials of user.
        /// </summary>
        /// <param name="loginDto">loginDto contains login detail of a new user trying to log in.</param>
        /// <returns>ResponseModel associated to login status of a user.</returns>
        public ResponseModel Login(LoginDto loginDto)
        {
            using (var unitOfWork = new UnitOfWork())
            {
                var userInfo = unitOfWork.Users.Find(QueryExpressions.UserHandle(loginDto));

                if (userInfo != null)
                {
                    if (!userInfo.IsVerified)
                        return ReturnStatements.FailedLogin(StatusMessages.UserNotVerified, StatusCodes.Unauthorized);

                    var userPassword = unitOfWork.UserPasswords.Find(QueryExpressions.UserPassword(loginDto, userInfo.Id));
                    if (userPassword != null)
                        return ReturnStatements.SuccessLogin(userInfo.Id);
                }
                return ReturnStatements.FailedLogin(StatusMessages.LoginFailed, StatusCodes.Unauthorized);
            }
        }

        /// <summary>
        /// User service to verify a new user. The method check the verification code in database saved in database against the verificationCode sent by user.
        /// </summary>
        /// <param name="verificationDto">verificationDto contains verification details of the user</param>
        /// <returns>ResponseModel is the model sent associated to the verification process.</returns>
        public ResponseModel VerifyUser(VerificationDto verificationDto)
        {
            var validationStatus = ValidateRequest.ValidateVerificationDto(verificationDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);
            verificationDto = validationStatus.Second;
            using (var unitOfWork = new UnitOfWork())
            {
                var userList = unitOfWork.Users.FindOnConstraint(m => m.Handle.Equals(verificationDto.Handle), prop => prop.UserPasswords).ToList();

                //If userList.Count is 0 then user does not exist. Zero index is used in this method because initially there is only one user and one password.
                if (userList.Count.Equals(0))
                    return ReturnStatements.FailedResponse(Strings.UserDoNotExist);
                var userPassword = userList[0].UserPasswords.ToList()[0];

                if (!userPassword.Password.Equals(verificationDto.Password))
                    return ReturnStatements.FailedResponse(Strings.PasswordMismatch);

                if (userList[0].VerificationCode.Equals(verificationDto.VerificationCode))
                {
                    userList[0].IsVerified = true;
                    unitOfWork.Users.Update(userList[0]);
                    var saveResponse = unitOfWork.Complete();
                    if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                        return ReturnStatements.FailedResponse(Strings.UnsuccessfullVerification);
                    return ReturnStatements.SuccessResponse(Strings.SuccessfullVerification);
                }
                return ReturnStatements.FailedResponse(Strings.VerificationCodeMismatch);
            }
        }

        /// <summary>
        /// Method to create a new forgot password request.
        /// </summary>
        /// <param name="forgotPasswordDto">forgotpassword dto contains dtails required by system to generate a new forgot password request.</param>
        /// <returns>ResponseModel containing the forgot password request creation status</returns>
        public ResponseModel ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {
            var validationStatus = ValidateRequest.ValidateForgotPasswordDto(forgotPasswordDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);
            forgotPasswordDto = validationStatus.Second;
            using (var unitOfWork = new UnitOfWork())
            {
                var user = unitOfWork.Users.Find(m => m.Handle.Equals(forgotPasswordDto.Handle));

                if (user == null)
                    return ReturnStatements.FailedResponse(Strings.UserDoNotExist);
                user.ForgotPasswordFlag = true;
                user.ForgotPasswordCode = Functions.GenerateCode().ToString();
                unitOfWork.Users.Update(user);
                var saveResponse = unitOfWork.Complete();

                if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                    return ReturnStatements.FailedResponse(DynamicListForResponse.Create(forgotPasswordDto));
                SendMail(forgotPasswordDto.Handle, user.ForgotPasswordCode, user.EmailId, true);
                return ReturnStatements.SuccessResponse(DynamicListForResponse.Create(forgotPasswordDto));
            }
        }

        /// <summary>
        /// Method to reset user password
        /// </summary>
        /// <param name="resetPasswordDto">resetPasswordDto contains information to reset a password for a user</param>
        /// <returns>ResponseModel associated to the status of resetting a user password</returns>
        public ResponseModel ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var validationStatus = ValidateRequest.ValidateResetPasswordDto(resetPasswordDto);

            if (!(bool)validationStatus.First)
                return ReturnStatements.BadRequestResponse(validationStatus.Second);
            using (var unitOfWork = new UnitOfWork())
            {
                var userList = unitOfWork.Users.FindOnConstraint(m => m.Handle.Equals(resetPasswordDto.Handle), prop => prop.UserPasswords).ToList();

                //Check if no user exist.
                if (userList.Count.Equals(0))
                    return ReturnStatements.FailedResponse(Strings.UserDoNotExist);
                //Get user at first index. Since handles are unique , therefore only one record will be fetched from database.
                var user = userList[0];

                if (!user.ForgotPasswordFlag)
                    return ReturnStatements.FailedResponse(Strings.NoRequestCreated);
                if (user.ForgotPasswordCode.Equals(resetPasswordDto.VerificationCode))
                {
                    user.ForgotPasswordFlag = false;
                    var userPassword = user.UserPasswords;
                    var passwordToUpdate = userPassword.Where(m => m.Status.Equals(true)).ToList()[0];
                    passwordToUpdate.Password = resetPasswordDto.Password;
                    passwordToUpdate.CreationDate = Functions.GetCurrentDate();
                    passwordToUpdate.CreationTime = Functions.GetCurrentTime();
                    unitOfWork.Users.Update(user);
                    unitOfWork.UserPasswords.Update(passwordToUpdate);
                    var saveResponse = unitOfWork.Complete();
                    if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                        return ReturnStatements.FailedResponse(DynamicListForResponse.Create(resetPasswordDto));
                    return ReturnStatements.SuccessResponse(DynamicListForResponse.Create(resetPasswordDto));
                }
                return ReturnStatements.FailedResponse(Strings.VerificationCodeMismatch);
            }
        }
    }
}
