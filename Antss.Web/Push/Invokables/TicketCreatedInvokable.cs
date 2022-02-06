using Antss.Model;
using Antss.Services;
using Antss.Web.Hubs;
using Coravel.Invocable;
using Microsoft.AspNetCore.SignalR;

public class TicketCreatedInvokable : IInvocable, IInvocableWithPayload<int>
{
    public int Payload { get; set; }

    private readonly IHubContext<MainHub> _hub;
    private readonly TicketService _svc;

    public TicketCreatedInvokable(TicketService svc, IHubContext<MainHub> hub)
    {
        _svc = svc;
        _hub = hub;
    }

    public async Task Invoke()
    {
        var ticket = await _svc.GetListItem(Payload);

        //todo: also send back to user who created the ticket (need to associate connections with users)
        await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
            .SendAsync("ticketCreated", ticket);
    }
}