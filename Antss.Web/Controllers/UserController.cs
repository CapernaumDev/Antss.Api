using Antss.Services;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.UserContracts;
using Antss.Web.Authorization;
using Antss.Web.Push;
using Microsoft.AspNetCore.Mvc;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AdminAuthorize]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly PushService _pushService;

        public UserController(UserService userService, PushService pushService)
        {
            _pushService = pushService;
            _userService = userService;
        }

        [HttpGet, Route("List")]
        public async Task<ActionResult<IEnumerable<UserListItem>>> Get()
        {
             return await _userService.GetList();
        }

        [HttpGet, Route("Get")]
        public async Task<UserDto> Get(int id)
        {
            return await _userService.GetById(id);
        }

        [HttpPost, Route("Create")]
        public async Task Create(UserDto user)
        {
            var userId = await _userService.Create(user);

            _pushService.UserCreated(userId);
        }

        [HttpPost, Route("Update")]
        public async Task<PostResult> Update(UserDto user)
        {
            var result = await _userService.Update(user);

            if (result.IsValid)
                _pushService.UserUpdated(user.Id);

            return result;
        }
    }
}
