using Business.Services;
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
    /// Web Api controller for patient insurance.
    /// </summary>
    [CustomException]
    [Authorize]
    [Route(RouteNames.PatientInsurance)]
    public class PatientInsuranceController : ApiController
    {
        private readonly PatientInsuranceService _services;

        public PatientInsuranceController()
        {
            _services = new PatientInsuranceService();
        }

        /// <summary>
        /// GET Api end point for patient insurances.
        /// </summary>
        /// <param name="patientInsuranceQuery"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage Get([FromUri]PatientInsuranceQuery patientInsuranceQuery)
        {
            try
            {
                var result = _services.Get(patientInsuranceQuery);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        /// <summary>
        /// POST Api end point for adding new insurance to a patient.
        /// </summary>
        /// <param name="newpatientInsurance"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage Add(AddPatientInsurance newpatientInsurance)
        {
            try
            {
                var userId = UserIdentity.GetUserId((ClaimsIdentity)User.Identity);
                var result = _services.Add(newpatientInsurance, userId);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
