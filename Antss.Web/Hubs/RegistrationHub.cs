using Antss.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Antss.Web.Hubs
{
    [Authorize]
    public partial class MainHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var groupName = GetGroupNameForUser();

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Caller.SendAsync("joinedGroup", groupName);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var groupName = GetGroupNameForUser();

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await base.OnDisconnectedAsync(exception);
        }

        private string GetGroupNameForUser()
        {
            return ((UserTypes)int.Parse(Context.User.Claims.Single(x => x.Type == "UserTypeId").Value)).ToString();
        }
    }
}
