import React, {FC, useEffect, useContext, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import {useNavigate} from "react-router-native";
import UserDataContext from "../contexts/UserData";

export const AddMenu:FC = ({museum, itemId, itemObj, setUpdatedData}) => {
    const {userData, setUserData} = useContext(UserDataContext);
    const [inACollection, setInACollection] = useState(false);
    const navigate = useNavigate();

    const isItemInCollection = (collection:object, museum:string, itemId:string) => {
        if ('items' in collection)
            return collection.items.some((item) => (item['item_id'] === itemId && item['museum'] === museum));
        return false;
    }
    const isItemInACollection = (museum:string, itemId:string) => {
        return userData.customCollections?.some((currCollection) => (isItemInCollection(currCollection, museum, itemId)));
    }
    const addToCollection = (collection:object) => {
        if (!isItemInCollection(collection, museum, itemId)){
            itemObj['museum'] = museum;
            itemObj['item_id'] = itemId;
            itemObj['in_collection'] = true;
            collection.items.push(itemObj);
            setUserData({...userData});
        }
    }
    const removeFromCollection = (collection:object) => {
        const newItems = [...collection.items];
        collection.items = newItems.filter((item) => item['item_id'] != itemId);
        setUserData({...userData});
        setUpdatedData(itemId);
    }
    useEffect(() => {
        setInACollection(isItemInACollection(museum, itemId));
    }, [userData, inACollection, itemObj.in_collection]);

    return (
        <Menu>
        <MenuTrigger>
            <Text style={styles.itemAddText}>{inACollection ? <>Remove</> : <>Add</>}</Text>
        </MenuTrigger>
        <MenuOptions>
            {!inACollection ?
                userData.customCollections?.map((collection, index) => {
                    if (!isItemInCollection(collection, museum, itemId))
                        return (<MenuOption key={index} text={`Add to ${collection.name}`} onSelect={() => {addToCollection(collection); setInACollection(true);}}/>)
                    })
                :
                userData.customCollections?.map((collection, index) => {
                    if (isItemInCollection(collection, museum, itemId))
                        return (<MenuOption key={index} text={`Remove from ${collection.name}`} onSelect={() => {removeFromCollection(collection); setInACollection(false);}}/>)
                    })
            }
            {!inACollection ?
                <MenuOption text='' onSelect={() => {navigate('/create')}}>
                    <Text style={styles.addCollection}>Create New Collection</Text>
                </MenuOption>
                :
                <></>
            }
        </MenuOptions>
      </Menu>
    );
}

const styles = StyleSheet.create({
    itemAddText: {
        fontSize: 15,
        fontWeight: '600'
    },
    addCollection: {
        borderTopWidth: 0.5,
        fontWeight: '600'
    }
});

export default AddMenu;