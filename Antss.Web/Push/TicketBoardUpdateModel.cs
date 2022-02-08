﻿using Antss.Services.Common;

namespace Antss.Web.Push
{
    public class TicketBoardUpdateModel
    {
        public int TicketId { get; set; }
        public int? BoardColumnIndex { get; set; }
        public IUserIdentity InitiatedByUser { get; set; }
    }
}
