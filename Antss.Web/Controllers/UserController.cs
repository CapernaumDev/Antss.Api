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
            return await _db.Users.AsNoTracking().Include(x => x.Office).ToListAsync();
        }

        [HttpPost]
        [Route("Create")]
        public async Task Create(User user)
        {
            var userToSave = new User
            {
                ContactNumber = user.ContactNumber,
                EmailAddress = user.EmailAddress,
                FirstName = user.FirstName,
                LastName = user.LastName,
                OfficeId = user.OfficeId,
                UserType = user.UserType
            };

            _db.Users.Add(userToSave);
            await _db.SaveChangesAsync();
        }
    }
}
