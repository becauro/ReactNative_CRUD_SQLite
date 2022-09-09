import AsyncStorage from '@react-native-async-storage/async-storage';
import db from './db';
import Product from './Product';

/*
ToDos:
  - To finish the other class methods, passing from AsyncStorage to SQLite
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
const sqlDeleteOne = 'DELETE FROM PRODUCT WHERE CODE=?';
const sqlSelect = 'SELECT * FROM PRODUCT';

class ProductManager {
  // HELPER Method:

  public async checkIfKeyExists(code: string) {
    return (await AsyncStorage.getAllKeys()).some(key => key === code);
  }

  private async createDb() {
    db.transaction((txn: any) => txn.executeSql(sqlCreate, []));
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
      this.createDb(); //
      console.log(product);

      await this.ExecuteQuery(sqlInsert, [
        product.Code,
        product.Name,
        product.Quantity,
      ]);
    } catch (e) {
      console.log('Add() func error: ');
      console.log(e);
    }
  }

  public async update(product: ProductType) {
    try {
      const jsonValue = JSON.stringify(product);
      await AsyncStorage.mergeItem(product.Code.toString(), jsonValue);
    } catch (e) {}
  }

  public async remove(key: string) {
    try {
      await this.ExecuteQuery(sqlDeleteOne, [key]);
    } catch (e) {
      return e;
    }
  }

  public async removeAll() {
    try {
      let keys = await AsyncStorage.getAllKeys();
      keys.forEach(async (key: string) => {
        await AsyncStorage.removeItem(key);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getOne(key: number) {
    return await AsyncStorage.getItem(key.toString());
  }

  public async getAll(): Promise<Array<ProductType>> {
    this.createDb();

    let selectQuery: any = await this.ExecuteQuery(sqlSelect, []);
    let objetos: Array<ProductType> = []; //

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

    return objetos;
  }
}

export default ProductManager;
