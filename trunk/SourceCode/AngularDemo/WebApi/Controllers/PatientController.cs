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
    /// Web Api controller for patient.
    /// </summary>
    [CustomException]
    [Authorize]
    [Route(RouteNames.Patient)]
    public class PatientController : ApiController
    {
        private readonly PatientService _services;

        public PatientController()
        {
            _services = new PatientService();
        }

        /// <summary>
        /// GET Api end point for patient.
        /// </summary>
        /// <param name="patientQuery"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage Get([FromUri]PatientQuery patientQuery)
        {
            try
            {
                var result = _services.Get(patientQuery);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        /// <summary>
        /// POST Api end point for adding new patient.
        /// </summary>
        /// <param name="newPatientDto"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage Add(PatientDto newPatientDto)
        {
            try
            {
                var result = _services.Add(newPatientDto);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex);
            }
        }
    }
}
