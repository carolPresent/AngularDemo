using Business.Constants;
using DataTransferObject.Models;
using System;

namespace Business.Utilities
{
    /// <summary>
    /// Functions used in business logic. Constants not used in this class in few places as strings were too large to store and would have
    /// become complex to understand.
    /// </summary>
    internal class Functions
    {
        /// <summary>
        /// Common method to get date
        /// </summary>
        /// <returns>DateTime having current date</returns>
        public static DateTime GetCurrentDate()
        {
            return DateTime.Now.Date;
        }

        /// <summary>
        /// Common method to get time
        /// </summary>
        /// <returns>TimeSpan having current time</returns>
        public static TimeSpan GetCurrentTime()
        {
            return DateTime.Now.TimeOfDay;
        }

        /// <summary>
        /// Generates a verification code of 6 digits by using random integer generator.
        /// </summary>
        /// <returns>integer value denoting verification code.</returns>
        public static int GenerateCode()
        {
            var random = new Random();
            return random.Next(Integers.MinimumVerificationCodeValue, Integers.MaximumVerificationCodeValue);
        }

        /// <summary>
        /// Create mail body on successfull registration.
        /// </summary>
        /// <param name="handle">handle is the handle of the user which will be used for logging in to the system.</param>
        /// <param name="emailId">emailId is the email address of the user</param>
        /// <param name="verificationCode">verificationCode i the code which is required by user to verify his account</param>
        /// <returns>string value denoting the mail body</returns>
        public static string CreateMailBody(string handle, string emailId, string verificationCode)
        {
            var returnItem = Strings.Empty;
            returnItem = "<label>Hi <b></label>" + handle + "!</b><br />";
            returnItem += "<p>Help us secure your account by verifying your email address (" + emailId + "). This lets you access all of our features.</p>";
            returnItem += "<p>Please enter verification code by logging in to the site. Your verification code is <b>" + verificationCode + "</b>.</p>";
            returnItem += "<p>You’re receiving this email because you recently created a new account. If this wasn’t you, please ignore this email.</p>";
            return returnItem;
        }

        /// <summary>
        /// Create mail body for adding patient
        /// </summary>
        /// <param name="emailId">emailId of the patient</param>
        /// <param name="name">name of patient</param>
        /// <returns>string value denoting the mail body</returns>
        public static string CreateMailBody(string emailId, string name)
        {
            var returnItem = Strings.Empty;
            returnItem = "<label>Hi <b></label>" + name + "!</b>";
            returnItem += "<p>You have been registered on our system by your email address (" + emailId + ")</p>";
            returnItem += "<p>You’re receiving this email because you have been added to our system. If this wasn’t you, please ignore this email.</p>";
            return returnItem;
        }

        /// <summary>
        /// Method to create mail body for forgot password request
        /// </summary>
        /// <param name="forgotPasswordDto">forgotPasswordDto contains user handle</param>
        /// <param name="verificationCode">verificationCode is the verification code to send to the user email address</param>
        /// <param name="emailId">emailId is the user email address</param>
        /// <returns>string value denoting the mail body</returns>
        public static string CreateMailBodyForgotPassword(string handle, string verificationCode, string emailId)
        {
            var returnItem = Strings.Empty;
            returnItem = "<label>Hi <b></label>" + handle + "!</b>";
            returnItem += "<p>Your forgot password request have been logged in to our system on your email address (" + emailId + ")</p>";
            returnItem += "<p>Verification code is <b>" + verificationCode + "</b></p>";
            returnItem += "<p>You’re receiving this email because you have created a forgot password request in our system. If this wasn’t you, please contact admin.</p>";
            return returnItem;
        }

        /// <summary>
        /// Generic method to save lines of code. Return the succes/fail response on the basis of save response from unitOfWork.Complete() method.
        /// </summary>
        /// <param name="saveResponse">saveResponse if response after the commit takes place.</param>
        /// <param name="ifTrue">If save response is 1 then success response is sent</param>
        /// <param name="ifFalse">If save response is 0 then fail response is sent</param>
        /// <returns>ResponseModel on the basis of saveResponse</returns>
        public static ResponseModel ReturnGeneric(int saveResponse, string ifTrue, string ifFalse)
        {
            if (saveResponse.Equals(Integers.UnsuccessfullDatabaseSave))
                return ReturnStatements.FailedResponse(ifFalse);
            return ReturnStatements.SuccessResponse(ifTrue);
        }
    }
}
