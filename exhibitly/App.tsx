import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Header from "./components/Header";
import CollectionList from "./components/CollectionList";
import { FC } from 'react';

//export default function App() {
const App = () => {
  return (
    <View style={styles.container}>
      <NativeRouter>
      <Header />
      <StatusBar style="auto" />
        <Routes>
        <Route path='/' Component={CollectionList} />
        <Route path='/login' Component={Header} />
        </Routes>
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;