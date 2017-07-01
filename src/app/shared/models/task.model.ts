import {Company} from './company.model';
import {Event} from './event.model';
import {User} from './user.model';

export class Task {
  id: number;
  event: Event;
  company: Company;
  assignee: User;
  type: string;
  callTime: Date;
  mailTime: Date;
  followUpTime: Date;
  status: string;
  notes: string;
}
