import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import { MenuProvider } from 'react-native-popup-menu';
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import ItemView from "./components/ItemView";
import CollectionList from "./components/CollectionList";
import CollectionCreate from "./components/CollectionCreate";
import ItemDataContext from "./contexts/ItemData";
import SystemDataContext from "./contexts/SystemData";
import UserDataContext from "./contexts/UserData";

//export default function App() {
const App = () => {
  const [allItems, setAllItems] = useState(new Array());
  const [systemData, setSystemData] = useState({collectionOffset: {x: 0, y: 0}, collectionLoads: 0, createCollection: false});
  const [userData, setUserData] = useState({userName: '', secret: '', customCollections: []});
  return (
    <SystemDataContext.Provider value={{systemData, setSystemData}}>
    <UserDataContext.Provider value={{userData, setUserData}}>
    <ItemDataContext.Provider value={{allItems, setAllItems}}>
    <MenuProvider>
    <View style={styles.container}>
        <NativeRouter>
          <StatusBar hidden />
          <Header />
          <Routes>
          <Route path='/' Component={ItemList} />
          <Route path='/create' Component={CollectionCreate} />
          <Route path='/collections' Component={CollectionList} />
          <Route path='/collections/:collection_id' Component={ItemList} />
          <Route path='/item/:museum/:item_id' Component={ItemView} /> 
          <Route path='/login' Component={Header} />
          </Routes>
        </NativeRouter>
      </View>
    </MenuProvider>
    </ItemDataContext.Provider>
    </UserDataContext.Provider>
    </SystemDataContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3266a8',
  },
});

export default App;