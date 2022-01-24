using Antss.Data;
using Antss.Model;
using Antss.Model.Enums;
using Antss.Model.ViewModels;
using Antss.Web.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppController : ControllerBase
    {
        private readonly AntssContext _db;
        private readonly EnumTransformer _enumTransformer;

        public AppController(AntssContext db, EnumTransformer enumTransformer)
        {
            _db = db;
            _enumTransformer = enumTransformer;
        }

        [HttpGet]
        [Route("AppData")]
        public ActionResult<AppData> Get()
        {
            return new AppData
            {
                // TODO: security / login / permission to see some / all of these
                Offices = _db.Offices.AsNoTracking().ToList(),
                UserTypes = _enumTransformer.ToFormattedCollection<UserTypes>()
            };
        }

        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public ActionResult<LoginResult> Login(LoginCredential login)
        {
            //we're just going to get the user for now without authenticating

            var foundUser = _db.Users.SingleOrDefault(x => x.Id == login.UserId);
            if (foundUser == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var appData = new AppData
            {
                //here will go appdata relevant to all user types
            };

            if (foundUser.UserType == UserTypes.Admin)
            {
                appData.Offices = _db.Offices.AsNoTracking().ToList();
                appData.UserTypes = _enumTransformer.ToFormattedCollection<UserTypes>();
            }

            return new LoginResult { User = foundUser, AppData = appData };
        }
    }
}
