import React, {FC, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, Image, Pressable, Dimensions} from 'react-native';
import {useNavigate} from "react-router-native";
import UserDataContext from "../contexts/UserData";

const windowDimensions = Dimensions.get('window');

export const CollectionMenu:FC = ({back = true, create = true, search = true}) => {
    const {userData, setUserData} = useContext(UserDataContext);

    const navigate = useNavigate();

    return (
        <View style={styles.buttons}>
            <View style={styles.createButton}>
                <Pressable style={styles.createPress} onPress={() => {navigate('/')}}>
                    <Text style={styles.createText}>All</Text>
                </Pressable>
            </View>
            <View style={styles.createButton}>
                <Pressable style={styles.createPress} onPress={() => {navigate('/collections')}}>
                    <Text style={styles.createText}>Collections</Text>
                </Pressable>
            </View>
            <View style={styles.createButton}>
                <Pressable style={styles.createPress}>
                    <Text style={styles.createText}>Search</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        width: windowDimensions.width,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createButton: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 10,
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

export default CollectionMenu;