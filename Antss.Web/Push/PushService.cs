using Antss.Services.Common;
using Coravel.Queuing.Interfaces;

namespace Antss.Web.Push
{
    public class PushService
    {
        private readonly IQueue _queue;

        public PushService(IQueue queue)
        {
            _queue = queue;
        }

        public void TicketCreated(int ticketId)
        {
            _queue.QueueInvocableWithPayload<TicketCreatedInvokable, int>(ticketId);
        }

        public void TicketStatusUpdated(int ticketId, int? boardColumnIndex, IUserIdentity initiatingUser)
        {
            var model = new TicketBoardUpdateModel 
            { 
                TicketId = ticketId, 
                BoardColumnIndex = boardColumnIndex ,
                InitiatedByUser = initiatingUser
            };

            _queue.QueueInvocableWithPayload<TicketUpdatedInvokable, TicketBoardUpdateModel>(model);
        }

        public void UserCreated(int userId)
        {
            _queue.QueueInvocableWithPayload<UserCreatedInvokable, int>(userId);
        }

        public void UserUpdated(int userId)
        {
            _queue.QueueInvocableWithPayload<UserUpdatedInvokable, int>(userId);
        }
    }
}
