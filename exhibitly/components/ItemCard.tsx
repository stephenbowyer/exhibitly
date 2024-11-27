import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Pressable, Dimensions} from 'react-native';
import {Link} from "react-router-native";
import {ItemsArray} from '../utils';
import AddMenu from "./AddMenu";

const windowDimensions = Dimensions.get('window');

interface ItemCardProps {
    itemObj: ItemsArray;
    key: number;
}

const ItemCard:FC<ItemCardProps> = ({itemObj})  => {
    const [dimensions, setDimensions] = useState({window: windowDimensions});

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window}) => {setDimensions({window})},
        );
        return () => subscription?.remove();
    });

    return (
        <View style={styles.item}>
            {(typeof itemObj === 'object' && 'imageURL' in itemObj && 'museum' in itemObj) ?
                <>
                    <Link to={`/item/${itemObj.museum}/${itemObj.id}`}>
                        <Image style={styles.itemImage} source={{ uri: itemObj.imageURL }} /> 
                    </Link>
                    <View style={styles.itemAdd}>
                        <Pressable style={styles.itemAddPress}>
                            <AddMenu museum={itemObj.museum} itemId={itemObj.id} itemObj={itemObj}/>
                        </Pressable>
                    </View> 
                </> : 
                <>
                    <Image style={styles.itemImage} source={{ uri: 'asset:/adaptive-icon.png' }} />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 3,
    },
    itemText: {
        fontSize: 20,
        fontWeight: '600',
    },
    itemImage: {
        borderRadius: 15,
        resizeMode: 'cover',
        // width: '30%',
        // height: '30%',
        width: (windowDimensions.width - 30) / 3,
        height: (windowDimensions.width - 30) / 3,
        borderWidth: 2.5,
        borderColor: '#3030dd',
    },
    itemAdd: {
       top: -30, left: 0, right: 10, bottom: 0,
       marginBottom: -30,
       justifyContent: 'flex-end',
       alignItems: 'flex-end',
    },
    itemAddPress: {
        borderRadius: 10,
    
        backgroundColor: '#8080ff',
        height: 30,
        width: 40,

        justifyContent: 'center',
        alignItems: 'center',

        borderColor: '#5050ff',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 3,
        borderRightWidth: 3,
 
    },
    itemAddText: {
        fontSize: 15,
        fontWeight: '600'
    }
});
export default ItemCard;