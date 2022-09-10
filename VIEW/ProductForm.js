import React, {useEffect, useState} from 'react';
import {Alert, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Product from '../MODEL/Product';
import ProductManager from '../MODEL/ProductManager';
import {styles} from './CommonStyles';

// This screen component is used for Register Mode and Update Mode

/*
ToDos:
  - To finish the save() function
  - After click in X button, a modal pop up to confirm
  - Show modal with Product details
*/

export default function ProductForm({route, navigation}) {
  const manager = new ProductManager();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  const checkAndLoadData = () => {
    if (route.params !== undefined) {
      const {Code, Name, Quantity} = route.params.prodData;
      setCode(Code.toString());
      setName(Name.toString());
      setQuantity(Quantity.toString());

      setUpdateMode(true);

      route.params = undefined; // It's necessary because as long as the fields change, this condition is checked because it is inside useEffect()
    }
  };

  useEffect(() => {
    checkAndLoadData();
  });

  const clearFields = () => {
    setCode('');
    setName('');
    setQuantity('');
  };

  const goToListScreen = () => {
    if (route.params !== undefined) {
      route.params = undefined;
    }
    setUpdateMode(false);
    clearFields();
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

  const checkIfKeyExists = async () => {
    const keyExists = await manager.checkIfKeyExists(code);

    if (updateMode === false && keyExists === true) {
      Alert.alert('Code already exist');
    } else if (updateMode === true && keyExists === false) {
      Alert.alert('Code not exist');
    }

    return keyExists;
  };

  const save = async () => {
    try {
      const fieldIsEmpty = checkFieldEmpty();
      // const keyExistsCode = await checkIfKeyExists();

      // if (fieldIsEmpty === false && keyExistsCode === false) {
      if (fieldIsEmpty === false) {
        const prodAux = new Product(
          parseInt(code, 10),
          name,
          parseInt(quantity, 10),
        );
        await manager.add(prodAux).then(goToListScreen);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const update = async () => {
    try {
      const fieldIsEmpty = checkFieldEmpty();
      // const keyExistsCode = await checkIfKeyExists();

      // if (fieldIsEmpty === false && keyExistsCode === true) {
      if (fieldIsEmpty === false) {
        const prodAux = new Product(
          parseInt(code, 10),
          name,
          parseInt(quantity, 10),
        );
        await manager.update(prodAux).then(goToListScreen);
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
      <TouchableOpacity
        style={styles.button}
        onPress={updateMode ? update : save}>
        <Text style={styles.buttonTextBig}>
          {updateMode ? 'Update' : 'Save'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToListScreen}>
        <Text style={styles.buttonTextBig}>
          {updateMode ? 'Cancel' : 'List / Cancel'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
