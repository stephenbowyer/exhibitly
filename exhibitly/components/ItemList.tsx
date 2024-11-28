import React, {FC, useEffect, useContext, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, ActivityIndicator} from 'react-native';
import { useParams } from "react-router-native";
import { fetchAllItems, shuffleItems } from '../utils';
import ItemCard from "./ItemCard";
import ItemSearch from "./ItemSearch";
import CollectionMenu from './CollectionMenu';
import ItemDataContext from "../contexts/ItemData";
import SystemDataContext from "../contexts/SystemData";
import UserDataContext from "../contexts/UserData";

const ItemList:FC = ()  => {
    const {collection_id} = useParams();
    const {allItems, setAllItems} = useContext(ItemDataContext);
    const {systemData, setSystemData} = useContext(SystemDataContext);
    const {userData, setUserData} = useContext(UserDataContext);
    const [titleText, setTitleText] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchBoxOpen, setSearchBoxOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [lastSearchQuery, setLastSearchQuery] = useState('');
    const [updatedData, setUpdatedData] = useState(0);

    const clearItems = () => {
        allItems.length = 0;
        setAllItems(new Array());
        setTitleText('All Items')
        if ('itemListLength' in systemData){
            const newSystemData = {...systemData};
            delete newSystemData['itemListLength'];
            setSystemData(newSystemData);
        }
    }
    const loadItems = () => {
        if (!('username' in userData)){
            userData['username'] = 'User';
            userData['secret'] = '';
            userData['customCollections'] = [{name: 'My First Collection', items: []}];
            setUserData(userData);
        }
        if (!('itemListLength' in systemData) || (systemData['itemListLength'] < allItems.length) ||
            (typeof collection_id === 'undefined')){
            const newSystemData = systemData;
            const currItems = allItems?.filter((item) => (('in_collection' in item) && (item.in_colllection === true)));
            setLoading(true);
            systemData['itemListLength'] = allItems.length;
            fetchAllItems(currItems.length+1, searchQuery).then((items) => {
                //shuffleItems(items);
                if (typeof items[0] === 'object' && ('id' in items[0]))
                    setAllItems([...new Set([...currItems, ...items])]);
                else
                    setAllItems([...new Set([...currItems, ...items.flat()])]);
                setLoading(false);
            }).catch((result) => {
                setTitleText("ERROR: "+result+" Please Reload"); //[AxiosError: Request failed with status code 404]
                setLoading(false);
            });
        }
    }
    const savePosition = (event) => {
        const newSystemData = systemData;
        newSystemData['itemListOffset'] = event.nativeEvent.contentOffset;
        setSystemData(newSystemData);
        if (event.nativeEvent.contentOffset.y > (event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height - 1000))
            loadItems();
    }
    useEffect(() => {
        if (collection_id)
            setAllItems(allItems.filter((item) => item.item_id !== updatedData));
    }, [updatedData])
    useEffect(() => {
        if (collection_id){
            systemData['collectionLoads'] = 0;
            if (userData['customCollections'][collection_id].items.length !== allItems.length)
                systemData['backupItems'] = allItems;
            setSystemData(systemData);
            setAllItems(userData['customCollections'][collection_id].items);
            setTitleText(userData['customCollections'][collection_id].name);
            setLoading(false);
        }
        else
        {
            if (lastSearchQuery !== searchQuery){
                allItems.length = 0;
                setAllItems(new Array());
                if ('itemListLength' in systemData)
                    delete systemData['itemListLength'];
                systemData['collectionLoads'] = 0;
                setSystemData(systemData);
            }
            if ((systemData['collectionLoads'] === 0) || (allItems.length === 0)){
                if ('backupItems' in systemData && systemData['backupItems'].length > 0){
                    setLoading(true);
                    if ('itemListLength' in systemData && systemData['itemListLength'] < allItems.length){
                        newSystemData = {...systemData};
                        newSystemData['itemListLength'] = 0;
                        setSystemData(newSystemData);
                    }
                    setAllItems(...systemData['backupItems']);
                    loadItems();
                    setLoading(false);
                }
                else
                {
                    clearItems();
                    loadItems();
                }
                systemData['collectionLoads']++;
                setSystemData(systemData);
                if (searchQuery.length === 0)
                    setTitleText('All Items')
                else
                    setTitleText('Search Results')
            }
            else
            {
                clearItems();
                loadItems();
                systemData['collectionLoads'] = 0;
                setSystemData(systemData);
            }
        }
    }, [searchQuery, collection_id]);
    return (
        <ScrollView style={styles.scrollView} onScroll={savePosition} contentOffset={systemData['itemListOffset']}>
            <CollectionMenu setSearchBoxOpen={setSearchBoxOpen} />
            { searchBoxOpen ? <ItemSearch setSearchQuery={setSearchQuery} setSearchBoxOpen={setSearchBoxOpen} /> : <></> }
            <Text style={styles.collectionTitle}>{titleText}</Text>
            { (typeof allItems === 'object' && allItems.length > 0) ?
                <View style={styles.collections}>
                    {allItems?.map((item, index) => <ItemCard style={styles.card} itemObj={item} key={index} setUpdatedData={setUpdatedData}/>)}
                </View> :
                <></>
            }
            { loading ? <ActivityIndicator style={styles.activity} size="large" color="#fff" /> : 
            (allItems.length === 0) ? <Text style={styles.empty}>Empty</Text> : <></> }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    collections: {
      paddingVertical: 20,
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    scrollView: {
    },
    card: {
    },
    collectionTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
    },
    empty: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        color: '#fff',
    },
    activity: {
        margin: 40,
    },
});
export default ItemList;