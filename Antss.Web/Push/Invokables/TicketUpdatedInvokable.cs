using Antss.Model;
using Antss.Services;
using Antss.Web.Hubs;
using Antss.Web.Push;
using Coravel.Invocable;
using Microsoft.AspNetCore.SignalR;

public class TicketUpdatedInvokable : IInvocable, IInvocableWithPayload<TicketBoardUpdateModel>
{
    public TicketBoardUpdateModel Payload { get; set; }

    private readonly IHubContext<MainHub> _hub;
    private readonly TicketService _svc;

    public TicketUpdatedInvokable(TicketService svc, IHubContext<MainHub> hub)
    {
        _svc = svc;
        _hub = hub;
    }

    public async Task Invoke()
    {
        var ticket = await _svc.GetListItem(Payload.TicketId);

        //todo: also send back to user who Updated the ticket (need to associate connections with users)
        await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
            .SendAsync("ticketStatusUpdated", ticket, Payload.BoardColumnIndex);
    }
}