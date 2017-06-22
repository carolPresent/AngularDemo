using Business.Services;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Constants;
using WebApi.Utilities;

namespace WebApi.Controllers
{
    /// <summary>
    /// Web api controller for insurance services.
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
        /// <param name="insuranceQuery"></param>
        /// <returns></returns>
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
        /// <param name="newInsuranceDto"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage Add(InsuranceDto newInsuranceDto)
        {
            try
            {
                var result = _services.Add(newInsuranceDto);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
