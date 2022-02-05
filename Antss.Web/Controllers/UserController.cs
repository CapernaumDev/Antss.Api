using Antss.Model;
using Antss.Services;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.UserContracts;
using Antss.Web.Authorization;
using Antss.Web.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AdminAuthorize]
    public class UserController : ControllerBase
    {
        private readonly IHubContext<MainHub> _hub;
        private readonly UserService _svc;

        public UserController(UserService svc, IHubContext<MainHub> hub)
        {
            _hub = hub;
            _svc = svc;
        }

        [HttpGet, Route("List")]
        public async Task<ActionResult<IEnumerable<UserListItem>>> Get()
        {
             return await _svc.GetList();
        }

        [HttpGet, Route("Get")]
        public async Task<UserDto> Get(int id)
        {
            return await _svc.GetById(id);
        }

        [HttpPost, Route("Create")]
        public async Task<PostResult> Create(UserDto user)
        {
            var result = await _svc.Create(user);

            var assignableUsers = await _svc.GetAssignableUserOptions();

            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                .SendAsync("updateAssignableUsers", assignableUsers);

            return result;
        }

        [HttpPost, Route("Update")]
        public async Task<PostResult> Update(UserDto user)
        {
            var result = await _svc.Update(user);

            var assignableUsers = await _svc.GetAssignableUserOptions();

            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                .SendAsync("updateAssignableUsers", assignableUsers);

            return result;
        }
    }
}
