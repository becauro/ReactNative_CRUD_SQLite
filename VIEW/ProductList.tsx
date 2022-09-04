import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import ProductManager from '../MODEL/ProductManager';
import {styles} from './CommonStyles';

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
  const [DATA, setDATA] = useState(Array<ProductType>);

  const loadData = async () => {
    const pm: ProductManager = new ProductManager();

    let newData: Array<ProductType> = await pm.getAll();
    setDATA(newData);
  };

  useEffect(() => {
    loadData();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.Code.toString()}
        // keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ProductComponent;
