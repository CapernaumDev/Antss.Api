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

        public async void TicketCreated(TicketListItem ticket)
        {
            //todo: also send back to user who created the ticket (need to associate connections with users)
            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                .SendAsync("ticketCreated", ticket);
        }

        public async void TicketStatusUpdated(TicketListItem ticket, int? boardColumnIndex)
        {
            //todo: also send back to user who created the ticket (need to associate connections with users)
            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                .SendAsync("ticketStatusUpdated", ticket, boardColumnIndex);
        }

        public async void UserCreated(UserListItem user)
        {
            await _hub.Clients.Groups(UserTypes.Admin.ToString()).SendAsync("userCreated", user);

            UpdateAssignableUsers();
        }

        public async void UserUpdated(UserListItem user)
        {
            await _hub.Clients.Groups(UserTypes.Admin.ToString()).SendAsync("userUpdated", user);

            UpdateAssignableUsers();
        }

        private async void UpdateAssignableUsers()
        {
            var assignableUsers = await _userService.GetAssignableUserOptions();

            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                    .SendAsync("updateAssignableUsers", assignableUsers);
        }
    }
}
