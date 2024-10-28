import React, {FC, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Link} from "react-router-native";
import CollectionMenu from './CollectionMenu';
import ItemDataContext from "../contexts/ItemData";
import SystemDataContext from "../contexts/SystemData";
import UserDataContext from "../contexts/UserData";

const CollectionList:FC = ()  => {
    const {allItems, setAllItems} = useContext(ItemDataContext);
    const {systemData, setSystemData} = useContext(SystemDataContext);
    const {userData, setUserData} = useContext(UserDataContext);

    // const loadItems = () => {
    //     setUserData({username: 'Stephen', secret: '',
    //         customCollections: [{name: 'Collection A', items: []}]
    //     });
    // }
    const savePosition = (event) => {
        const newSystemData = systemData;
        newSystemData['collectionOffset'] = event.nativeEvent.contentOffset;
        setSystemData(newSystemData);
    }
    return (
        <ScrollView style={styles.scrollView} onScroll={savePosition} contentOffset={systemData['collectionOffset']}>
            <CollectionMenu />
            <Text style={styles.collectionText}>{userData['username']}'s Collections</Text>
            <View style={styles.collections}>
                {userData.customCollections?.map((collection, index) => <Link key={index} to={'/collections/'+index}><Text style={styles.collectionName}>{collection.name} ({collection.items.length} items)</Text></Link>)}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    collections: {
      paddingVertical: 20,
      justifyContent: 'center',
    },
    collectionText: {
        fontSize: 20,
        textAlign:'center',
        fontWeight: '900',
        color: '#fff',
    },
    collectionName: {
        fontSize: 16,
        textAlign:'center',
        fontWeight: '300',
        color: '#fff',
        textDecorationLine: 'underline',
        textDecorationColor: '#fff',
    },
    card: {
    },
});
export default CollectionList;