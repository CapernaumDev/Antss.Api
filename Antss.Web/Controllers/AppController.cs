using Antss.Data;
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

        public AppController(AntssContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("AppData")]
        public ActionResult<AppData> Get()
        {
            return new AppData
            {
                Offices = _db.Offices.AsNoTracking().ToList()
            };
        }
    }
}
