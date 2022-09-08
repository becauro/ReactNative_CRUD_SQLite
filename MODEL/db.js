import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'productsDataBase.db'});

export default db;
