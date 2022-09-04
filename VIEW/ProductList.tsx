import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import ProductManager from '../MODEL/ProductManager';
import {styles} from './CommonStyles';

/*
ToDos:
 - Remove option button in each Product
 - UPDATE product
 - Show modal with Product details
*/

type ProductType = {
  Code: number;
  Name: String;
  Quantity: Number;
};

const renderItem = ({item}: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.Name}</Text>
  </View>
);

const ProductComponent = () => {
  const manager: ProductManager = new ProductManager();
  const [DATA, setDATA] = useState(Array<ProductType>);

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
        <Text style={styles.buttonTextBig}>Remove products</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductComponent;
