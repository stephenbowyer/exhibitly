import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Header from "./components/Header";
import CollectionList from "./components/CollectionList";
import ItemView from "./components/ItemView";

//export default function App() {
const App = () => {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3266a8',
  },
});

export default App;