import { Moment } from 'moment';

export interface ITransaction {
  id?: number;
  accountId?: string;
  value?: number;
  date?: Moment;
  details?: string;
}

export class Transaction implements ITransaction {
  constructor(public id?: number, public accountId?: string, public value?: number, public date?: Moment, public details?: string) {}
}
