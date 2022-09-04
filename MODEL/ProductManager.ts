import AsyncStorage from '@react-native-async-storage/async-storage';

type ProductType = {
  Code: number;
  Name: String;
  Quantity: Number;
};

const salveProduct = async (key: string, value: ProductType) => {
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

const removeAllProducts = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys();

    keys.forEach(async (key: string) => {
      await AsyncStorage.removeItem(key);
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductsJSON = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    return await AsyncStorage.multiGet(keys);
  } catch (e) {
    return [];
  }
};
const getProducts = async () => {
  try {
    let objects: Array<ProductType> = [];
    let objJSON = await getProductsJSON();
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
};

class ProductManager {
  public async remove(chave: number) {
    await removeProduct(chave.toString());
  }

  public async removeAll() {
    await removeAllProducts();
  }

  public async add(product: ProductType) {
    await salveProduct(product.Code.toString(), product);
  }
  public async getAll(): Promise<Array<ProductType>> {
    let lista: Array<ProductType> = await getProducts();
    return lista;
  }
}

export default ProductManager;
