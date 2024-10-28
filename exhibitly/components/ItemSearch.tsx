import React, {FC, useEffect, useContext, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import UserDataContext from "../contexts/UserData";

const ItemSearch:FC = ({setSearchQuery, setSearchBoxOpen})  => {
    const {userData, setUserData} = useContext(UserDataContext);
    const [text, setText] = useState('');

    const onQuerySubmit = () => {
        setSearchQuery(text);
    }

    return (
        <View style={styles.create}>
            <Text style={styles.createTitle}>Search</Text>
            <Text style={styles.createSubTitle}>Please enter a word or number to find items</Text>
            <TextInput style={styles.createInput}
                defaultValue={text}
                onChangeText={newText => setText(newText)}
                onSubmitEditing={onQuerySubmit}
                autoFocus={true} blurOnSubmit={true} editable={true} enterKeyHint="enter" inputMode="text" />
            <View style={styles.buttons}>
                <View style={styles.createButton}>
                        <Pressable style={styles.createPress} onPress={onQuerySubmit}>
                            <Text style={styles.createText}>Search</Text>
                        </Pressable>
                </View>
                <View style={styles.createButton}>
                        <Pressable style={styles.createPress} onPress={() => {setSearchQuery(''); setText(''); setSearchBoxOpen(false)}}>
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

export default ItemSearch;