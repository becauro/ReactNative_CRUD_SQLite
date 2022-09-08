import AsyncStorage from '@react-native-async-storage/async-storage';
import db from './db';
import Product from './Product';

type ProductType = {
  Code: number;
  Name: String;
  Quantity: Number;
};

const sqlCreate =
  'CREATE TABLE IF NOT EXISTS PRODUCT(' +
  'CODIGO INTEGER PRIMARY KEY, ' +
  ' NAME VARCHAR(20), QUANTITY INTEGER)';
const sqlInsert =
  'INSERT INTO PRODUCT ( CODE, NAME, QUANTITY )' + ' VALUES (?,?,?)';
const sqlDelete = 'DELETE FROM PRODUCT WHERE CODE=?';
const sqlSelect = 'SELECT * FROM PRODUCT';

class ProductManager {
  // HELPER Method:

  public async checkIfKeyExists(code: string) {
    return (await AsyncStorage.getAllKeys()).some(key => key === code);
  }

  // NORMAL Methods:

  public async add1(product: ProductType) {
    try {
      const jsonValue = JSON.stringify(product);
      await AsyncStorage.setItem(product.Code.toString(), jsonValue);
    } catch (e) {}
  }

  public async add(product: ProductType) {
    try {
      db.transaction((txn: any) =>
        txn.executeSql(sqlInsert, [
          product.Code,
          product.Name,
          product.Quantity,
        ]),
      );
    } catch (e) {}
  }

  public async update(product: ProductType) {
    try {
      const jsonValue = JSON.stringify(product);
      await AsyncStorage.mergeItem(product.Code.toString(), jsonValue);
    } catch (e) {}
  }

  public async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key.toString());
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

  public async getAll1(): Promise<Array<ProductType>> {
    try {
      let objects: Array<ProductType> = [];

      let keys = await AsyncStorage.getAllKeys();
      let objJSON = await AsyncStorage.multiGet(keys);

      if (objJSON != null && objJSON.length > 0) {
        objJSON.forEach((element: any) => {
          let product: ProductType = JSON.parse(element[1]);
          objects.push(product);
        });
      }
      return objects;
    } catch (e) {
      return [];
    }
  }

  public async getAll(
    useRetorno: (produtos: Array<ProductType>) => void,
  ): Promise<Array<ProductType>> {
    let objetos: Array<ProductType> = [];
    db.transaction((txn: any) =>
      txn.executeSql(sqlSelect, [], (_txn2: any, results: any) => {
        for (let i = 0; i < results.rows.length; ++i) {
          let linha = results.rows.item(i);
          let produto: ProductType = new Product(
            linha.CODE,
            linha.NAME,
            linha.QUANTITY,
          );
          objetos.push(produto);
        }
        useRetorno(objetos);
        // if (objetos.length < 1) {
        //   this.criarBanco();
        // }
      }),
    );

    return objetos;
  }
}

export default ProductManager;
