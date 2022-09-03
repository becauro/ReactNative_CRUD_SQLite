class Product {
  Code: number;
  Name: string;
  Quantity: number;

  constructor(code: number, name: string, quantity: number) {
    this.Code = code;
    this.Name = name;
    this.Quantity = quantity;
  }
}

export default Product;
