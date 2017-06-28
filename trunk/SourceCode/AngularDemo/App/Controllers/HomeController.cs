using System.Web.Mvc;

namespace App.Controllers
{
    /// <summary>
    /// The one and only controller. Since controllers are merely used for templating in angular, hence all view are included in a single controller.
    /// </summary>
    public class HomeController : Controller
    {
        public ActionResult App()
        {
            return View();
        }

        public ActionResult Servers()
        {
            return View();
        }

        public ActionResult Patient()
        {
            return View();
        }

        public ActionResult Insurance()
        {
            return View();
        }

        public ActionResult PatientInsurance()
        {
            return View();
        }

        public ActionResult Main()
        {
            return View();
        }

        public ActionResult Sidebar()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult Verify()
        {
            return View();
        }

        public ActionResult ForgotPassword()
        {
            return View();
        }
    }
}