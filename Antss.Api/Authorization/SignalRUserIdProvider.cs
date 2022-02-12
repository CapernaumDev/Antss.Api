using Microsoft.AspNetCore.SignalR;

namespace Antss.Api.Authorization
{
    public class SignalRUserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.Claims.Single(x => x.Type == "UserId").Value;
        }
    }
}
