import React, {useEffect, useState} from 'react';
import {Alert, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Product from '../MODEL/Product';
import ProductManager from '../MODEL/ProductManager';
import {styles} from './CommonStyles';

/*
ToDos:

 - Check duplicate code before register it
 - Duplicate this screen for Update screen
    - If not, this screen data overwrite the data
*/
export default function ProductForm({route, navigation}) {
  const manager = new ProductManager();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const checkAndLoadData = () => {
    if (route.params !== undefined) {
      const {Code, Name, Quantity} = route.params.prodData;
      setCode(Code.toString());
      setName(Name.toString());
      setQuantity(Quantity.toString());

      route.params = undefined;
    }
  };

  useEffect(() => {
    console.log('AQUI O route.params.Code in ProductForm:');
    console.log(route.params);

    checkAndLoadData();
  });

  const clearFields = () => {
    setCode('');
    setName('');
    setQuantity('');
  };

  const goToList = () => {
    navigation.navigate('ProductList');
  };

  const checkFieldEmpty = () => {
    let error = false;

    if (code === '') {
      error = true;
      return Alert.alert('Code field is empty');
    } else if (name === '') {
      error = true;
      return Alert.alert('Name field is empty');
    } else if (quantity === '') {
      error = true;
      return Alert.alert('Quantity field is empty');
    }

    return error;
  };

  const save = () => {
    try {
      const fieldIsEmpty = checkFieldEmpty();

      if (fieldIsEmpty === false) {
        const prodAux = new Product(
          parseInt(code, 10),
          name,
          parseInt(quantity, 10),
        );
        manager.add(prodAux).then(navigation.navigate('ProductList'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Code"
        placeholderTextColor="white"
        keyboardType={'numeric'}
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="white"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        placeholderTextColor="white"
        keyboardType={'numeric'}
        value={quantity}
        onChangeText={setQuantity}
      />
      <TouchableOpacity style={styles.button} onPress={clearFields}>
        <Text style={styles.buttonTextBig}>Clear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonTextBig}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToList}>
        <Text style={styles.buttonTextBig}>List</Text>
      </TouchableOpacity>
    </View>
  );
}
