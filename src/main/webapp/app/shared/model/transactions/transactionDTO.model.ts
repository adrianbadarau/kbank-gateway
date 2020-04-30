export interface ITransactionDTO {
  reference?: number;
  accountNumber?: string;
  description?: string;
  startBalance?: number;
  mutation?: number;
  endBalance?: number;
}

export class TransactionDTO implements ITransactionDTO {
  constructor(
    public reference?: number,
    public accountNumber?: string,
    public description?: string,
    public startBalance?: number,
    public mutation?: number,
    public endBalance?: number
  ) {}
}
