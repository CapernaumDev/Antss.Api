export class UpdateTicketStatus {
    ticketId: number;
    ticketStatusId: number;

    constructor(ticketId: number, ticketStatusId: number) {
        this.ticketId = ticketId;
        this.ticketStatusId = ticketStatusId;
    }
  }
  