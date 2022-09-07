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
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  dataContainer: {
    flexDirection: 'column',
    backgroundColor: 'green',
    marginVertical: 1,
    marginHorizontal: 1,
  },
  dataContainerItem: {
    fontSize: 12,
    color: 'white',
    margin: 5,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'green',
    marginVertical: 1,
    marginHorizontal: 1,
  },
  btnsContainerItem: {
    backgroundColor: 'blue',
    color: 'red',
    marginVertical: 8,
    marginHorizontal: 8,
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
  },
});
