using Antss.Data;
using Antss.Model;
using Antss.Model.Entities;
using Antss.Web.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AdminAuthorize]
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

        [HttpGet]
        [Route("Get")]
        public async Task<User> Get(int id)
        {
            return await _db.Users.SingleAsync(x => x.Id == id);
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

        [HttpPost, Route("Update")]
        public async Task Update(User user)
        {
            var existingUser = _db.Users.Single(x => x.Id == user.Id);

            existingUser.UserType = (UserTypes)user.UserTypeId;
            existingUser.LastName = user.LastName;
            existingUser.FirstName = user.FirstName;
            existingUser.ContactNumber = user.ContactNumber;
            existingUser.EmailAddress = user.EmailAddress;
            existingUser.OfficeId = user.OfficeId;

            await _db.SaveChangesAsync();
        }
    }
}
