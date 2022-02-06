using Antss.Model;
using Antss.Services;
using Antss.Web.Hubs;
using Coravel.Invocable;
using Microsoft.AspNetCore.SignalR;

public class UserUpdatedInvokable : IInvocable, IInvocableWithPayload<int>
{
    public int Payload { get; set; }

    private readonly IHubContext<MainHub> _hub;
    private readonly UserService _svc;

    public UserUpdatedInvokable(UserService svc, IHubContext<MainHub> hub)
    {
        _svc = svc;
        _hub = hub;
    }

    public async Task Invoke()
    {
        var user = await _svc.GetListItem(Payload);

        await _hub.Clients.Groups(UserTypes.Admin.ToString()).SendAsync("userUpdated", user);

        var assignableUsers = await _svc.GetAssignableUserOptions();

        await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                .SendAsync("updateAssignableUsers", assignableUsers);
    }
}