import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import ProductManager from '../MODEL/ProductManager';
import {styles} from './CommonStyles';

/*
ToDos:
 - Add Remove (x) button in each Product
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

  const updateData = (prodData: ProductType) => {
    navigation.navigate('ProductForm', {prodData});
  };

  const loadAllData = async () => {
    let newData: Array<ProductType> = await manager.getAll();
    setDATA(newData);
  };

  const removeAllData = async () => {
    await manager.removeAll();
  };

  const removeData = async (code: string) => {
    await manager
      .remove(code)
      .then(_result =>
        manager
          .getAll()
          .then(products => setDATA(products))
          .catch(error => console.log(error)),
      )
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadAllData();
  });

  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.Name}</Text>
      <View style={styles.btnsContainer}>
        <Text style={styles.itemUpdateBtn} onPress={() => updateData(item)}>
          Update
        </Text>
        <Text
          style={styles.itemCloseBtn}
          onPress={() => removeData(item.Code.toString())}>
          X
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        // keyExtractor={item => item.Code.toString()}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={removeAllData}>
        <Text style={styles.buttonTextBig}>Remove ALL products</Text>
      </TouchableOpacity>
    </View>
  );
}
