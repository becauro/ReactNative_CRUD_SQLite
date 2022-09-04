import {StyleSheet, StatusBar} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
  },
  itemUpdateBtn: {
    backgroundColor: 'blue',
    color: 'red',
  },
  inputContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    backgroundColor: 'grey',
    color: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 12,
  },
  button: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 5,
  },
  buttonTextBig: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
