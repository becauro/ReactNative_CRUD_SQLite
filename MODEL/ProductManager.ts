import db from './db';
import Product from './Product';

/*
ToDos:
  - To finish the other class methods, passing from AsyncStorage to SQLite
  - Become somes vars into let
  */

type ProductType = {
  Code: number;
  Name: String;
  Quantity: Number;
};

const sqlCreate =
  'CREATE TABLE IF NOT EXISTS PRODUCT(' +
  'CODE INTEGER PRIMARY KEY, ' +
  ' NAME VARCHAR(20), QUANTITY INTEGER)';
const sqlInsert =
  'INSERT INTO PRODUCT ( CODE, NAME, QUANTITY )' + ' VALUES (?,?,?)';
const sqlDelete = 'DELETE FROM PRODUCT';
const sqlDeleteOne = 'DELETE FROM PRODUCT WHERE CODE=?';
const sqlSelect = 'SELECT * FROM PRODUCT';
const sqlSelectOne = 'SELECT * FROM PRODUCT WHERE CODE=?';
const sqlUpdateOne = 'UPDATE PRODUCT SET NAME=?, QUANTITY=? WHERE CODE=?';

class ProductManager {
  // HELPER Method:

  public async checkIfKeyExists(code: string) {
    try {
      let result: any = await this.ExecuteQuery(sqlSelectOne, [code]);
      if (result.rows.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.log('checkIfKeyExists() error from ProductManager.ts :');
      console.log(error);
    }
  }

  private async createDb() {
    try {
      db.transaction((txn: any) => txn.executeSql(sqlCreate, []));
    } catch (error) {
      console.log('createDb() error from ProductManager.ts :');
      console.log(error);
    }
  }

  private ExecuteQuery = (sql: any, params: any) =>
    new Promise((resolve, reject) => {
      db.transaction((trans: any) => {
        trans.executeSql(
          sql,
          params,
          (_trans2: any, results: any) => {
            resolve(results);
          },

          (error: any) => {
            reject(error);
          },
        );
      });
    });

  // NORMAL Methods:

  public async add(product: ProductType) {
    try {
      this.createDb(); // If add() is called, it's assumed a table already exists
      console.log(product);

      await this.ExecuteQuery(sqlInsert, [
        product.Code,
        product.Name,
        product.Quantity,
      ]);
    } catch (error) {
      console.log('Add() error from ProductManager.ts :');
      console.log(error);
    }
  }

  public async update(product: ProductType) {
    try {
      await this.ExecuteQuery(sqlUpdateOne, [
        product.Name,
        product.Quantity,
        product.Code,
      ]);
    } catch (e) {
      console.log('Update() error from ProductManager.ts :');
      console.log(e);
    }
  }

  public async remove(key: string) {
    try {
      await this.ExecuteQuery(sqlDeleteOne, [key]);
    } catch (error) {
      console.log('remove() error from ProductManager.ts :');
      console.log(error);
    }
  }

  public async removeAll() {
    try {
      await this.ExecuteQuery(sqlDelete, []);
    } catch (error) {
      console.log('removeAll() error from ProductManager.ts :');
      console.log(error);
    }
  }

  public async getOne(key: number) {
    try {
      await this.ExecuteQuery(sqlSelectOne, [key]);
    } catch (error) {
      console.log('getOne() error from ProductManager.ts :');
      console.log(error);
    }
  }

  public async getAll(): Promise<Array<ProductType>> {
    let objetos: Array<ProductType> = [];
    try {
      this.createDb(); // If getAll() is called, it's assumed a table already exists

      let selectQuery: any = await this.ExecuteQuery(sqlSelect, []);
      var rows = selectQuery.rows;

      for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        let produto: ProductType = new Product(
          item.CODE,
          item.NAME,
          item.QUANTITY,
        );
        objetos.push(produto);
      }
    } catch (error) {
      console.log('gelAll() error from ProductManager.ts :');
      console.log(error);
    }
    return objetos;
  }
}

export default ProductManager;
