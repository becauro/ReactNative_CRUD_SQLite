import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
import Product from '../MODEL/Product';
import ProductManager from '../MODEL/ProductManager';

// const defaultData = [
//   {
//     Code: 1,
//     Name: 'default - hello',
//     Quatity: 2,
//   },
//   {
//     Code: 4,
//     Name: 'default - hi',
//     Quatity: 3,
//   },
//   {
//     Code: 6,
//     Name: 'default - take care',
//     Quatity: 5,
//   },
// ];

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

  // var DATA: any = [];

  const loadData = async () => {
    const p1: ProductType = new Product(1, 'tv', 2);
    const p2: ProductType = new Product(2, 'desk', 4);
    const p3: ProductType = new Product(3, 'table', 11);
    const pm: ProductManager = new ProductManager();

    await pm.add(p1);
    await pm.add(p2);
    await pm.add(p3);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'yellow',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
  },
});

export default ProductComponent;
