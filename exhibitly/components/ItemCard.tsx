import React, {FC} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ItemsArray} from '../utils';

interface ItemCardProps {
    itemObj: ItemsArray;
    key: number;
}

const ItemCard:FC<ItemCardProps> = ({itemObj})  => {
    const imgURL = 'https://www.artic.edu/iiif/2/'+itemObj.image_id+'/full/843,/0/default.jpg';
    return (
        <View style={styles.item}>
            <Image style={styles.itemImage} source={{ uri: imgURL }} />
            <View style={styles.itemAdd}>
                <Text style={styles.itemAddText}>Add</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        padding: 3
    },
    itemText: {
        fontSize: 20,
        fontWeight: '600',
    },
    itemImage: {
        borderRadius: 15,
        resizeMode: 'cover',
        width: 130,
        height: 130,
    },
    itemAdd: {
        position: 'absolute',
        top: 0, left: 0, right: 10, bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    itemAddText: {
        fontSize: 20,
        fontWeight: '600'
    }
});
export default ItemCard;