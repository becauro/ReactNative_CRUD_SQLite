# SQLite CRUD

This project was developed in React Native and designed only for studies purpose.
Maybe it's is a work in progress.

For now this app works only in Android platform. I've not set anything for iOS yet, but you can do so if you wish ;-)


## Description

As the title suggest, there is only the CRUD features in this app.
I tried developing a simple **Product Registration** app, just for practicing basic concepts in React Native.

Each products have only three data: Code, Name and Quantity.


## Data persistence

The data persist through the [SQLite](https://www.npmjs.com/package/react-native-sqlite-storage) database.

### Other versions of the project

I built this same project under different types of Data Persistence:

- [AsyncStorage version](https://github.com/becauro/ReactNative_CRUD_AsyncStorage)
- Realm version (coming...) 


## Screens

There is only two simple screens:

1. The Product Form screen is used for update and register a new product. Yes, the form Screen is a Dynamic component to be able to perform those two tasks.

2. The ProductList screen list all registered products.
There is a Button on the footer of screen to remove ALL registered products .

## How to build the project


I know only two ways to develop an app in React Native:

1. By using Expo (Easier way for noobs)
2. By use React Native CLI

Both ways require specifics settings inside the Project.

However I developed it under second way (React Native CLI).

So, in order to be able to build the app, make sure to follow the React Native [documentation](https://reactnative.dev/docs/environment-setup#development-os) step-by-step for React Native CLI mode (Not Expo way) according your Operation System (macOS, Windows or GNU/Linux).

### NOTE about Expo

If you're used with Expo, try adapt the project by following [this Expo](https://docs.expo.dev/bare/installing-expo-modules/) documentation. 

PS: I've not tested it yet. I'm just giving you what documentation says!


### NOTE about Install Nodejs

In my opinion the best way to install/uninstall Nodejs is by use NVM manager:

This tools allow you install and use node version as quick as installing an app from Playstore.

- [NVM](https://github.com/nvm-sh/nvm#important-notes) for GNU/Linux.
- [NVM](https://github.com/coreybutler/nvm-windows) for Windows.



## How to Run the project

Once the development environment get done and the project get cloned, follow the following steps:

1. In command line, go to the project folder
2. Type: `npm install`
3. Once the previous command get finished, open another command line (terminal) and type: `npm start`
4. Go back to the previous terminal and type: `npm run android`



