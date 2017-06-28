using Business.Services;
using DataTransferObject.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Constants;
using WebApi.Utilities;

namespace WebApi.Controllers
{
    /// <summary>
    /// Web api controller for Account.The controller interacts with business layer to execute basic CRUD operations on users.
    /// </summary>
    [CustomException]
    [Route(RouteNames.Account)]
    public class AccountController : ApiController
    {
        private readonly UserService _services;

        public AccountController()
        {
            _services = new UserService();
        }

        /// <summary>
        /// POST Api end point to register/add a new user.
        /// </summary>
        /// <param name="newUserDto">newUserDto contains personal information of user and user id and password.</param>
        /// <returns>HttpResponseMessage of user addition in database.</returns>
        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Add(UserDto newUserDto)
        {
            try
            {
                var result = _services.Add(newUserDto);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        /// <summary>
        /// POST Api end point to verify a new user
        /// </summary>
        /// <param name="verificationDto">verificationDto contains verification details of the user</param>
        /// <returns>HttpResponseMessage associated to the user verification status</returns>
        [AllowAnonymous]
        [HttpPost]
        [Route(RouteNames.Verify)]
        public HttpResponseMessage Verify(VerificationDto verificationDto)
        {
            try
            {
                var result = _services.VerifyUser(verificationDto);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        /// <summary>
        /// POST Api end point to create a new forgot password request for a user.
        /// </summary>
        /// <param name="forgotPasswordDto">forgotpassword dto contains dtails required by system to generate a new forgot password request.</param>
        /// <returns>HttpResponseMessage containing the forgot password request creation status</returns>
        [AllowAnonymous]
        [HttpPost]
        [Route(RouteNames.ForgotPassword)]
        public HttpResponseMessage ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                var result = _services.ForgotPassword(forgotPasswordDto);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        /// <summary>
        /// PUT Api end point to reset user password by sending the verification code sent ot user via email.
        /// </summary>
        /// <param name="resetPasswordDto">resetPasswordDto contains information to reset a password for a user</param>
        /// <returns>HttpResponseMessage associated to the status of resetting a user password</returns>
        [AllowAnonymous]
        [HttpPut]
        [Route(RouteNames.ResetPassword)]
        public HttpResponseMessage ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            try
            {
                var result = _services.ResetPassword(resetPasswordDto);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        /// <summary>
        /// Get api to check if user is logged in or not.
        /// </summary>
        /// <returns>HttpResponseMessage with status ok</returns>
        [Route(RouteNames.LoginStatus)]
        [Authorize]
        [HttpGet]
        public HttpResponseMessage LoginStatus()
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
