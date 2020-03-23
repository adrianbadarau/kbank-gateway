import { IClientAccount } from 'app/shared/model/products/client-account.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
  type?: IClientAccount;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public imageContentType?: string,
    public image?: any,
    public type?: IClientAccount
  ) {}
}
