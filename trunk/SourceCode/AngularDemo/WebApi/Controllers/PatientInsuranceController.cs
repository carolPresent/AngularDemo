using Business.Services;
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
    /// Web Api controller for patient insurance. The controller performs basic CRUD operations on patient insurances.
    /// An authorized API
    /// The controller uses CustomException attribute to log exception using elmah.
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
        /// <param name="patientInsuranceQuery">patientInsuranceQuery containing query to get PatientInsuranceDto from database</param>
        /// <returns>HttpResponseMessage containing list of PatientInsuranceDto</returns>
        [HttpGet]
        public HttpResponseMessage Get([FromUri]PatientInsuranceQuery patientInsuranceQuery)
        {
            var result = _services.Get(patientInsuranceQuery);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// POST Api end point for adding new insurance to a patient.
        /// </summary>
        /// <param name="newpatientInsurance">newpatientInsurance containing required information of patient insurance</param>
        /// <returns>HttpResponseMessage containing addition status of patient insurance</returns>
        [HttpPost]
        public HttpResponseMessage Add(AddPatientInsurance newpatientInsurance)
        {
            var userId = UserIdentity.GetUserId((ClaimsIdentity)User.Identity);
            var result = _services.Add(newpatientInsurance, userId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// PUT Api end point to update patient insurance in database
        /// </summary>
        /// <param name="oldPatientInsurance">oldPatientInsurance contains the information required to update an old patient insurance</param>
        /// <returns>HttpResponseMessage that contains the response of modifying a patient insurance in the database</returns>
        [HttpPut]
        public HttpResponseMessage Update(AddPatientInsurance oldPatientInsurance)
        {
            var userId = UserIdentity.GetUserId((ClaimsIdentity)User.Identity);
            var result = _services.Update(oldPatientInsurance, userId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}
