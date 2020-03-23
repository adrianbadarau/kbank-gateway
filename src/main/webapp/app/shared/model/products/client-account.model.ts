export interface IClientAccount {
  id?: number;
  customerID?: string;
  iban?: string;
  name?: string;
  ballance?: number;
  userId?: number;
}

export class ClientAccount implements IClientAccount {
  constructor(
    public id?: number,
    public customerID?: string,
    public iban?: string,
    public name?: string,
    public ballance?: number,
    public userId?: number
  ) {}
}
