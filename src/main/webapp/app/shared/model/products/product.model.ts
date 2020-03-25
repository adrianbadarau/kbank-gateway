export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public imageContentType?: string,
    public image?: any
  ) {}
}
