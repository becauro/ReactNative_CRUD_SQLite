import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList_Screen from './VIEW/ProductList';
import ProductForm from './VIEW/ProductForm';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductForm"
          component={ProductForm}
          options={{title: 'Product Form'}}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList_Screen}
          options={{title: 'Product List'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
