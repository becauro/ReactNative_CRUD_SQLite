import 'react-native-gesture-handler';
import React from 'react';
// import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList_Screen from './VIEW/ProductList';
import ProductForm from './VIEW/ProductForm';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductForm" component={ProductForm} />
        <Stack.Screen name="ProductList" component={ProductList_Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const App = () => {
//   return <ProductList_Screen />;
// };

export default App;
