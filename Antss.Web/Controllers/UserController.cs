using Antss.Data;
using Antss.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AntssContext _db;

        public UserController(AntssContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("List")]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await _db.Users.ToListAsync();
        }
    }
}
