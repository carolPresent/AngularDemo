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
    }
}
