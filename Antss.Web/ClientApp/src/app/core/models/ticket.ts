import { User } from './user';

export class Ticket {
  id!: number;
  raisedBy!: User;
  assignedTo!: User;
  ticketStatus!: string;
  description!: string;
}
