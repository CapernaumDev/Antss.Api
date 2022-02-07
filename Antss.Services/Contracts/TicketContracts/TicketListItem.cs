namespace Antss.Services.Contracts.TicketContracts
{
    public class TicketListItem
    {
        public int Id { get; set; }
        public string RaisedBy { get; set; }
        public int RaisedById { get; set; }
        public string? AssignedTo { get; set; }
        public string TicketStatus { get; set; }
        public int TicketStatusId { get; set; }
        public string Description { get; set; }
    }
}
