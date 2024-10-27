import React, {FC, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, ScrollView, ActivityIndicator} from 'react-native';
import { fetchAllItems, shuffleItems } from '../utils';
import ItemCard from "./ItemCard";
import ItemDataContext from "../contexts/ItemData";
import SystemDataContext from "../contexts/SystemData";

const CollectionList:FC = ()  => {
    const {allItems, setAllItems} = useContext(ItemDataContext);
    const {systemData, setSystemData} = useContext(SystemDataContext);
    const loadItems = () => {
            if (!('collectionLength' in systemData) || (systemData['collectionLength'] < allItems.length)){
                // console.log('loading...');
                const newSystemData = systemData;
                systemData['collectionLength'] = allItems.length;
                fetchAllItems(allItems.length+1).then((items) => {
                    // shuffleItems(items);
                    if (items[0].hasOwnProperty('id'))
                        setAllItems([...new Set([...allItems, ...items])]);
                    else
                        setAllItems([...new Set([...allItems, ...items.flat()])]);

                }).catch((result) => {
                    console.log("ERROR", result); //[AxiosError: Request failed with status code 404]
                });
            }
    }
    const savePosition = (event) => {
        const newSystemData = systemData;
        newSystemData['collectionOffset'] = event.nativeEvent.contentOffset;
        setSystemData(newSystemData);
        if (event.nativeEvent.contentOffset.y > (event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height - 1000))
            loadItems();
    }
    useEffect(() => {
        if (systemData['collectionLoads'] === 0){
            loadItems();
            systemData['collectionLoads']++;
            setSystemData(systemData);
        }
    }, []);
    return (
        <ScrollView style={styles.scrollView} onScroll={savePosition} contentOffset={systemData['collectionOffset']}>
            <View style={styles.collections}>
            {allItems?.map((item) => <ItemCard style={styles.card} itemObj={item} key={item.museum+item.id} />)}
            </View>
            <ActivityIndicator size="large" color="#fff" />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    collections: {
      paddingVertical: 20,
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    scrollView: {
    },
    card: {
    },
});
export default CollectionList;