﻿namespace Antss.Model.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public int RaisedById { get; set; }
        public User RaisedBy { get; set; }
        public int? AssignedToId { get; set; }
        public User AssignedTo { get; set; }

        public TicketStatuses TicketStatus { get; set; }
        public string Description { get; set; }
    }
}