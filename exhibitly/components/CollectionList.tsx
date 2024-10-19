import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { fetchItems } from '../utils';
import ItemCard from "./ItemCard";

const CollectionList:FC = ()  => {
    const [allItems, setAllItems] = useState(new Array());
    useEffect(() => {
        fetchItems().then(items => {
            setAllItems(items.data);
        }).catch((result) => {
            console.log("ERROR", result);
        });
    }, []);
    return (
        <View style={styles.collections}>
            {allItems?.map((item) => <ItemCard itemObj={item} key={item.id}/>)}
        </View>
    )
}
const styles = StyleSheet.create({
    collections: {
      paddingVertical: 20,
      borderBottomWidth: 1,
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: '#3266a8'
    },
});
export default CollectionList;