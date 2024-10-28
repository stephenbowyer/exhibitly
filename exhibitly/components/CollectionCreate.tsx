import React, {FC, useEffect, useContext, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import {useNavigate} from "react-router-native";
import UserDataContext from "../contexts/UserData";

const CollectionCreate:FC = ({newItemObj = {}})  => {
    const {userData, setUserData} = useContext(UserDataContext);
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const createNewCollection = () => {
        const collectionName = text;
        if (collectionName.length > 0)
        {
            userData.customCollections.push({name: collectionName});
            if (Object.keys(newItemObj).length > 0)
                userData.customCollections[userData.customCollections.length-1]['items'] = newItemObj;
            else
                userData.customCollections[userData.customCollections.length-1]['items'] = new Array();
            setUserData(userData);
            endNewCollection();
        }
    }
    const endNewCollection = () => {
        setText('');
        navigate('/');
    }
    return (
        <View style={styles.create}>
            <Text style={styles.createTitle}>Create New Collection</Text>
            <Text style={styles.createSubTitle}>Please enter a name for your new collection</Text>
            <TextInput style={styles.createInput}
                defaultValue={text}
                onChangeText={newText => setText(newText)}
                onSubmitEditing={createNewCollection}
                autoFocus={true} blurOnSubmit={true} editable={true} enterKeyHint="enter" inputMode="text" />
            <View style={styles.buttons}>
                <View style={styles.createButton}>
                        <Pressable style={styles.createPress} onPress={createNewCollection}>
                            <Text style={styles.createText}>Create</Text>
                        </Pressable>
                </View>
                <View style={styles.createButton}>
                        <Pressable style={styles.createPress} onPress={endNewCollection}>
                            <Text style={styles.createText}>Cancel</Text>
                        </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    create: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    createTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '900',
        color: '#fff',
    },
    createSubTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '300',
        color: '#fff',
        margin: 10,
    },
    createInput: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '400',
        color: '#000',
        backgroundColor: '#fff',
        width: '80%',
        marginLeft: 10,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
    },
    createButton: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 20,
    },
    createPress: {
        borderRadius: 10,
    
        backgroundColor: '#8080ff',
        height: 30,
        width: 100,

        justifyContent: 'center',
        alignItems: 'center',

        borderColor: '#5050ff',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 3,
        borderRightWidth: 3,

    },
    createText: {
        fontSize: 15,
        fontWeight: '800'
    },
});

export default CollectionCreate;