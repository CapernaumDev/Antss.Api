using Antss.Services;
using Antss.Services.Contracts;
using Antss.Services.Contracts.UserContracts;
using Antss.Web.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AdminAuthorize]
    public class UserController : ControllerBase
    {
        private readonly UserService _svc;

        public UserController(UserService svc)
        {
            _svc = svc;
        }

        [HttpGet]
        [Route("List")]
        public async Task<ActionResult<IEnumerable<UserListItem>>> Get()
        {
            return await _svc.GetList();
        }

        [HttpGet]
        [Route("Get")]
        public async Task<UserDto> Get(int id)
        {
            return await _svc.GetById(id);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<PostResult> Create(UserDto user)
        {
            return await _svc.Create(user);
        }

        [HttpPost, Route("Update")]
        public async Task<PostResult> Update(UserDto user)
        {
            return await _svc.Update(user);
        }
    }
}
