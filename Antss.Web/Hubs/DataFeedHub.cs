using Antss.Services.Contracts.CommonContracts;
using Microsoft.AspNetCore.SignalR;

namespace Antss.Web.Hubs
{
    // Yes partial class is a strange sight but we want to use 1 http / websocket connection per user
    // and it's one connection per hub so we make 1 big hub and organise it through partial 
    // (also allows us to share the groups we assign users to between 'hubs'
    //
    // "If you’re using multiple hubs just for organization within the same project then
    // I’d recommend using a partial class with more methods."
    // -- David Fowler (creator of signalR)
    public partial class MainHub : Hub
    {

    }
}
