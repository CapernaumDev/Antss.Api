namespace Antss.Services.Contracts.TicketContracts
{
    public class UpdateTicketStatus
    {
        public int TicketId { get; set; }
        public int TicketStatusId { get; set; }
        public int? BoardColumnIndex { get; set; }
    }
}
