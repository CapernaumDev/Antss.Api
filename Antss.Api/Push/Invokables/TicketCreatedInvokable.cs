using Antss.Model;
using Antss.Services;
using Antss.Api.Hubs;
using Antss.Api.Push;
using Coravel.Invocable;
using Microsoft.AspNetCore.SignalR;

public class TicketCreatedInvokable : IInvocable, IInvocableWithPayload<TicketBoardUpdateModel>
{
    public TicketBoardUpdateModel Payload { get; set; }

    private readonly IHubContext<MainHub> _hub;
    private readonly TicketService _svc;
    private const string ClientCommand = "ticketCreated";

    public TicketCreatedInvokable(TicketService svc, IHubContext<MainHub> hub)
    {
        _svc = svc;
        _hub = hub;
    }

    public async Task Invoke()
    {
        var ticket = await _svc.GetListItem(Payload.TicketId);

        await _hub.Clients.User(ticket.RaisedById.ToString())
            .SendAsync(ClientCommand, ticket, Payload.InitiatedByUser.UserId);

        await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
            .SendAsync(ClientCommand, ticket, Payload.InitiatedByUser.UserId);
    }
}