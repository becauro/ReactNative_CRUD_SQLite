import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from './Product';

const salveProduct = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {}
};
const removeProduct = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {}
};
const getProductsJSON = async () => {
  try {
    let keys: any = [];
    keys = await AsyncStorage.getAllKeys();
    return await AsyncStorage.multiGet(keys);
  } catch (e) {
    return [];
  }
};
const obterProducts = async () => {
  try {
    let objects: Array<Product> = [];
    let objJSON = await getProductsJSON();
    if (objJSON != null && objJSON.length > 0) {
      objJSON.forEach((element: any) => {
        let product: Product = JSON.parse(element[1]);
        objects.push(product);
      });
    }
    return objects;
  } catch (e) {
    return [];
  }
};

class ProductManager {
  public async remove(chave: number) {
    removeProduct(chave.toString());
  }
  public async add(product: Product) {
    salveProduct(product.Code.toString(), product);
  }
  public async getAll(): Promise<Array<Product>> {
    let lista: Array<Product> = await obterProducts();
    return lista;
  }
}

export default ProductManager;
