using Antss.Services;
using Antss.Services.Contracts.CommonContracts;
using Antss.Api.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Antss.Api.Controllers
{
    [ApiController, Authorize, Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthenticationService _svc;

        public AuthenticationController(AuthenticationService svc)
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
