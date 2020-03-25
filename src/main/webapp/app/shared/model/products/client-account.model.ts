import { IProduct } from 'app/shared/model/products/product.model';

export interface IClientAccount {
  id?: string;
  customerID?: string;
  iban?: string;
  name?: string;
  ballance?: number;
  user?: string;
  type?: IProduct;
}

export class ClientAccount implements IClientAccount {
  constructor(
    public id?: string,
    public customerID?: string,
    public iban?: string,
    public name?: string,
    public ballance?: number,
    public user?: string,
    public type?: IProduct
  ) {}
}
