using Antss.Data;
using Antss.Model;
using Antss.Model.Enums;
using Antss.Model.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
    }
}
