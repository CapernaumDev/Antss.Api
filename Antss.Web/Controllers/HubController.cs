using Antss.Web.Authorization;
using Antss.Web.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    public class HubController : Controller
    {
        private IHubContext<MainHub> _hub;

        public HubController(IHubContext<MainHub> hub)
        {
            _hub = hub;
        }

        [AllowAnonymous]
        public IActionResult Test()
        {
            _hub.Clients.All.SendAsync("test", "test message to all authenticated clients: " + DateTime.Now.ToLocalTime());

            return Ok(new { Message = "Request Completed" });
        }
    }
}
