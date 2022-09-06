import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import ProductManager from '../MODEL/ProductManager';
import {styles} from './CommonStyles';

/*
ToDos:
 - Add Remove (x) button in each Product
    - After click in X button, a modal pop up to confirm
 - UPDATE product navigate to Update Screen, not to ProductForm screen
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

  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.Name}</Text>
      <Text style={styles.itemUpdateBtn} onPress={() => updateData(item)}>
        Update
      </Text>
    </View>
  );

  const loadAllData = async () => {
    let newData: Array<ProductType> = await manager.getAll();
    setDATA(newData);
  };

  const removeAllData = async () => {
    await manager.removeAll();
  };

  useEffect(() => {
    loadAllData();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.Code.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={removeAllData}>
        <Text style={styles.buttonTextBig}>Remove ALL products</Text>
      </TouchableOpacity>
    </View>
  );
}
