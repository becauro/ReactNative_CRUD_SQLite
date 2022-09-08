import AsyncStorage from '@react-native-async-storage/async-storage';

type ProductType = {
  Code: number;
  Name: String;
  Quantity: Number;
};

class ProductManager {
  // HELPER Method:

  public async checkIfKeyExists(code: string) {
    return (await AsyncStorage.getAllKeys()).some(key => key === code);
  }

  // NORMAL Methods:

  public async add(product: ProductType) {
    try {
      const jsonValue = JSON.stringify(product);
      await AsyncStorage.setItem(product.Code.toString(), jsonValue);
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

  public async getAll(): Promise<Array<ProductType>> {
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
}

export default ProductManager;
