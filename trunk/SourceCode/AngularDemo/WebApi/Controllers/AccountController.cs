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
    /// Web api controller for Account.
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
        /// <param name="newUserDto"></param>
        /// <returns></returns>
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
