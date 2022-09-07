import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import ProductManager from '../MODEL/ProductManager';
import {styles} from './CommonStyles';

/*
ToDos:
  - After click in X button, a modal pop up to confirm
  - Show modal with Product details
*/

type ProductType = {
  Code: number;
  Name: String;
  Quantity: Number;
};

export default function ProductList({navigation}: any) {
  const manager: ProductManager = new ProductManager();
  const [DATA, setDATA] = useState(Array<ProductType>);

  const loadAllData = async () => {
    let newData: Array<ProductType> = await manager.getAll();
    setDATA(newData);
  };

  const updateData = (prodData: ProductType) => {
    navigation.navigate('ProductForm', {prodData});
  };

  const removeAllData = async () => {
    await manager.removeAll();
  };

  const removeData = async (code: string) => {
    await manager.remove(code);
    await loadAllData();
  };

  useEffect(() => {
    console.log('get in useEffect 1');

    loadAllData();
  }, []);

  function renderItem({item}: any) {
    console.log('Get in renderItem');

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.Name.toString()}</Text>
        <View style={styles.btnsContainer}>
          <Text style={styles.itemUpdateBtn} onPress={() => updateData(item)}>
            Update
          </Text>
          <Text
            style={styles.itemCloseBtn}
            // onPress={async () => await removeData(item.Code.toString())}>
            onPress={() => removeData(item.Code.toString())}>
            X
          </Text>
        </View>
      </View>
    );
  }

  return DATA.length !== 0 ? (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.Code.toString()}
        // keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={removeAllData}>
        <Text style={styles.buttonTextBig}>Remove ALL products</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <Text> Empty List </Text>
  );
}
