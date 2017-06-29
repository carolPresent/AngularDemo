using Business.Services;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using WebApi.Constants;
using WebApi.Utilities;

namespace WebApi.Controllers
{
    /// <summary>
    /// Web Api controller for patient.The controller executes basic CRUD operations of patient.
    /// An authorized api.
    /// The controller uses CustomException attribute to log exception using elmah.
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
        /// <param name="patientQuery">patientQuery contains query model to get patient from database</param>
        /// <returns>HttpResponseMessage containing list of PatientDto</returns>
        [HttpGet]
        public HttpResponseMessage Get([FromUri]PatientQuery patientQuery)
        {
            var result = _services.Get(patientQuery);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// POST Api end point for adding new patient.
        /// </summary>
        /// <param name="newPatientDto">newPatientDto contains information of patient to be added.</param>
        /// <returns>HttpResponseMessage containing patient addition status</returns>
        [HttpPost]
        public HttpResponseMessage Add(PatientDto newPatientDto)
        {
            var userId = UserIdentity.GetUserId((ClaimsIdentity)User.Identity);
            var result = _services.Add(newPatientDto, userId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// PUT Api end point to update a patien data in database
        /// </summary>
        /// <param name="oldPatientDto">oldPatientDto contains information of patient to be modified.</param>
        /// <returns>HttpResponseMessage regarding the modification status of the patient</returns>
        [HttpPut]
        public HttpResponseMessage Update(PatientDto oldPatientDto)
        {
            var userId = UserIdentity.GetUserId((ClaimsIdentity)User.Identity);
            var result = _services.Update(oldPatientDto, userId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}
