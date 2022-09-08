import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'productsDataBase.db', location: 'default'});

console.log('Retorno abertura do banco: ');
console.log(db);

export default db;
