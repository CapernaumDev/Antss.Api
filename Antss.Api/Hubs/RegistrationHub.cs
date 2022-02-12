using Antss.Services;
using Antss.Api.Authorization;
using Microsoft.AspNetCore.SignalR;
using AuthorizeAttribute = Microsoft.AspNetCore.Authorization.AuthorizeAttribute;

namespace Antss.Api.Hubs
{
    [Authorize]
    public partial class MainHub : Hub
    {
        private readonly UserService _userService;
        
        public MainHub(UserService userService) 
        {
            _userService = userService;
        }

        public override async Task OnConnectedAsync()
        {
            var groupName = Context.User.Identity.ToUserIdentity().UserType.ToString();

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Caller.SendAsync("joinedGroup", groupName);

            var appData = await _userService.GetAppData(Context.User.Identity.ToUserIdentity());

            await Clients.Caller.SendAsync("initialAppData", appData);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var groupName = Context.User.Identity.ToUserIdentity().UserType.ToString();

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await base.OnDisconnectedAsync(exception);
        }
    }
}
