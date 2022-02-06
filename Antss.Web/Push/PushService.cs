using Antss.Model;
using Antss.Services;
using Antss.Services.Contracts.TicketContracts;
using Antss.Services.Contracts.UserContracts;
using Antss.Web.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Antss.Web.Push
{
    public class PushService
    {
        private readonly IHubContext<MainHub> _hub;
        private readonly UserService _userService;

        public PushService(IHubContext<MainHub> hub, UserService userService)
        {
            _hub = hub;
            _userService = userService;
        }

        public async Task TicketCreated(TicketListItem ticket)
        {
            //todo: also send back to user who created the ticket (need to associate connections with users)
            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                .SendAsync("ticketCreated", ticket);
        }

        public async Task TicketStatusUpdated(TicketListItem ticket, int? boardColumnIndex)
        {
            //todo: also send back to user who created the ticket (need to associate connections with users)
            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                .SendAsync("ticketStatusUpdated", ticket, boardColumnIndex);
        }

        public async Task UserCreated(UserListItem user)
        {
            await _hub.Clients.Groups(UserTypes.Admin.ToString()).SendAsync("userCreated", user);

            await UpdateAssignableUsers();
        }

        public async Task UserUpdated(UserListItem user)
        {
            await _hub.Clients.Groups(UserTypes.Admin.ToString()).SendAsync("userUpdated", user);

            await UpdateAssignableUsers();
        }

        private async Task UpdateAssignableUsers()
        {
            var assignableUsers = await _userService.GetAssignableUserOptions();

            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                    .SendAsync("updateAssignableUsers", assignableUsers);
        }
    }
}
