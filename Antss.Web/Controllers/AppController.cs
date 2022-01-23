using Antss.Data;
using Antss.Model;
using Antss.Model.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Runtime.Serialization;

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
                Offices = _db.Offices.AsNoTracking().ToList(),
                UserTypes = new List<KeyValuePair<int, string>> 
                {
                    //TODO iterate enum
                    new KeyValuePair<int, string>((int)UserTypes.User, GetEnumMemberAttributeValue(UserTypes.User)),
                    new KeyValuePair<int, string>((int)UserTypes.Support, GetEnumMemberAttributeValue(UserTypes.Support)),
                    new KeyValuePair<int, string>((int)UserTypes.Admin, GetEnumMemberAttributeValue(UserTypes.Admin))
                }
            };
        }

        //TODO: Find a place for framework extensions
        private static string GetEnumMemberAttributeValue(Enum value)
        {
            return
                value
                    .GetType()
                    .GetMember(value.ToString())
                    .FirstOrDefault()
                    ?.GetCustomAttribute<EnumMemberAttribute>()
                    ?.Value
                ?? value.ToString();
        }
    }
}
