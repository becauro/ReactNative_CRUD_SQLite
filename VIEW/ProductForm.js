import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import Product from '../MODEL/Product';
import ProductManager from '../MODEL/ProductManager';
import {styles} from './CommonStyles';

export default function ProductForm({navigation}) {
  const manager = new ProductManager();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const save = () => {
    try {
      const prodAux = new Product(
        parseInt(code, 10),
        name,
        parseInt(quantity, 10),
      );
      manager.add(prodAux).then(navigation.navigate('ProductList'));
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
      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonTextBig}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
