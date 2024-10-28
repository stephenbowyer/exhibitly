import React, {FC, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, Image, Pressable, Dimensions} from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import {useNavigate} from "react-router-native";
import UserDataContext from "../contexts/UserData";

export const AddMenu:FC = ({museum, itemId, itemObj}) => {
    const {userData, setUserData} = useContext(UserDataContext);

    const navigate = useNavigate();

    const isItemInCollection = (collection:object, museum:string, itemId:string) => {
        if ('items' in Object.keys(collection))
            return collection.items.some((item) => (item['item_id'] === itemId && item['museum'] === museum));
        return false;
    }
    const addToCollection = (collection:object) => {
        if (!isItemInCollection(collection, museum, itemId)){
            collection.items.push(itemObj);
            setUserData(userData);
        }
    }
    return (
        <Menu>
        <MenuTrigger>
            <Text style={styles.itemAddText}>Add</Text>
        </MenuTrigger>
        <MenuOptions>
            {userData.customCollections?.map((collection, index) => {
                    if (!isItemInCollection(collection, museum, itemId))
                        return (<MenuOption key={index} text={`Add to ${collection.name}`} onSelect={() => {addToCollection(collection)}}/>)
                })
            }
            <MenuOption text='' onSelect={() => {navigate('/create')}}>
                <Text style={styles.addCollection}>Create New Collection</Text>
            </MenuOption>
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