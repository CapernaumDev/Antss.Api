import { User } from './user/user';

export class Ticket {
  id!: number;
  raisedBy!: User;
  assignedTo!: User;
  ticketStatus!: string;
  description!: string;
}
