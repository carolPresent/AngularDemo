using Business.Services;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;
using System;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using WebApi.Constants;
using WebApi.Utilities;

namespace WebApi.Controllers
{
    /// <summary>
    /// Web api controller for insurance services.The controller interacts with business layer to perform CRUD operations on insurances.
    /// An authorized api.
    /// </summary>
    [CustomException]
    [Authorize]
    [Route(RouteNames.Insurance)]
    public class InsuranceController : ApiController
    {
        private readonly InsuranceService _services;

        public InsuranceController()
        {
            _services = new InsuranceService();
        }

        /// <summary>
        /// GET Api end point for insurance.
        /// </summary>
        /// <param name="insuranceQuery">insuranceQuery contains query parameters to get insurances.</param>
        /// <returns>HttpResponseMessage containing list of InsuranceDto.</returns>
        [HttpGet]
        public HttpResponseMessage Get([FromUri]InsuranceQuery insuranceQuery)
        {
            try
            {
                var result = _services.Get(insuranceQuery);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        /// <summary>
        /// POST Api end point for adding new insurance.
        /// </summary>
        /// <param name="newInsuranceDto">newInsuranceDto contains information of an insurance to add in database.</param>
        /// <returns>HttpResponseMessage of addition of insurance in database.</returns>
        [HttpPost]
        public HttpResponseMessage Add(InsuranceDto newInsuranceDto)
        {
            try
            {
                var userId = UserIdentity.GetUserId((ClaimsIdentity)User.Identity);
                var result = _services.Add(newInsuranceDto,userId);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        /// <summary>
        /// PUT Api end point to update an insurance
        /// </summary>
        /// <param name="oldInsuranceDto">oldInsuranceDto contains the new information that are to be added in the system</param>
        /// <returns></returns>
        [HttpPut]
        public HttpResponseMessage Update(InsuranceDto oldInsuranceDto)
        {
            try
            {
                var userId = UserIdentity.GetUserId((ClaimsIdentity)User.Identity);
                var result = _services.Update(oldInsuranceDto, userId);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
