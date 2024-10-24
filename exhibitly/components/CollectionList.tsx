import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { fetchItems, fetchAllItems, shuffleItems } from '../utils';
import ItemCard from "./ItemCard";

const CollectionList:FC = ()  => {
    const [allItems, setAllItems] = useState(new Array());
    useEffect(() => {
        fetchAllItems().then(items => {
                shuffleItems(items);
                if (items[0].hasOwnProperty('id'))
                    setAllItems(items);
                else
                    setAllItems(items.flat());
        }).catch((result) => {
            console.log("ERROR", result); //[AxiosError: Request failed with status code 404]
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
    },
});
export default CollectionList;