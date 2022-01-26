using Antss.Services;
using Antss.Services.Contracts;
using Antss.Web.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Antss.Web.Controllers
{
    [ApiController, Authorize, Route("api/[controller]")]
    public class AppController : ControllerBase
    {
        private readonly LoginService _svc;

        public AppController(LoginService svc)
        {
            _svc = svc;
        }

        [HttpPost, AllowAnonymous, Route("Login")]
        public ActionResult<LoginResult> Login(LoginCredential loginCredential)
        {
            var result = _svc.Login(loginCredential);

            if (!result.IsValid)
                return BadRequest(new { message = "Username or password is incorrect" });

            return result;
        }
    }
}
