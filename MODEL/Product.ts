export class Product {
  Code: number;
  Name: String;
  Quantity: Number;

  // constructor(Code: number, Name: String, Quantity: Number);

  //  constructor(Code = 0, Name = "", Quantity: 0) {
  //   this.Code = Code,
  //   this.Name= Name,
  //   this.Quantity = Quantity,
  // }

  constructor(Code: number, Name: String, Quantity: Number) {
    this.Code = Code,
    this.Name= Name,
    this.Quantity = Quantity,
  }

}
