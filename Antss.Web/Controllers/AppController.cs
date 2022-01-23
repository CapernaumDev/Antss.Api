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
                // TODO: security / login / permission to see some / all of these
                Offices = _db.Offices.AsNoTracking().ToList(),
                UserTypes = ConvertEnumToCollection<UserTypes>()
            };
        }

        //TODO: Make a place for framework extensions
        private IEnumerable<KeyValuePair<int, string>> ConvertEnumToCollection<T>() where T : Enum
        {
            var result = new List<KeyValuePair<int, string>>();
            foreach (var enumValue in Enum.GetValues(typeof(T)).Cast<int>())
            {
                result.Add(new KeyValuePair<int, string>(enumValue, GetEnumMemberAttributeValue((T)(object)enumValue)));
            }

            return result;
        }

        private string GetEnumMemberAttributeValue(Enum value)
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
