import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Header from "./components/Header";
import CollectionList from "./components/CollectionList";
import ItemView from "./components/ItemView";
import ItemDataContext from "./contexts/ItemData";
import SystemDataContext from "./contexts/SystemData";

//export default function App() {
const App = () => {
  const [allItems, setAllItems] = useState(new Array());
  const [systemData, setSystemData] = useState({collectionOffset: {x: 0, y: 0}, collectionLoads: 0});
  return (
    <SystemDataContext.Provider value={{systemData, setSystemData}}>
    <ItemDataContext.Provider value={{allItems, setAllItems}}>
    <View style={styles.container}>
        <NativeRouter>
          <StatusBar hidden />
          <Header />
          <Routes>
          <Route path='/' Component={CollectionList} />
          <Route path='/item/:museum/:item_id' Component={ItemView} /> 
          <Route path='/login' Component={Header} />
          </Routes>
        </NativeRouter>
      </View>
    </ItemDataContext.Provider>
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