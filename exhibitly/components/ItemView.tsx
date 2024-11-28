import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Dimensions, BackHandler, Pressable, ScrollView} from 'react-native';
import { useParams, useNavigate } from "react-router-native";
import { fetchItem } from '../utils';
import AddMenu from "./AddMenu";
import CollectionMenu from './CollectionMenu';

const windowDimensions = Dimensions.get('window');

const ItemView:FC = ()  => {
    const {museum, item_id} = useParams();
    const [dimensions, setDimensions] = useState({window: windowDimensions});
    const [itemObj, setItemObj] = useState(new Array());
    const [imgURL, setImgURL] = useState("./assets:icon.png");
    const navigate = useNavigate();

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window}) => {setDimensions({window})},
        );
        return () => subscription?.remove();
      });

    useEffect(() => {
        fetchItem(museum, item_id).then(item => {
            setItemObj(item);
            if (item.imageURL)
                setImgURL(item.imageURL);
            else
                setImgURL('asset:/adaptive-icon.png');
        }).catch((result) => {
            console.log("ERROR", result);
        });
    }, []);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          () => { navigate('/'); return true;},
        );
        return () => backHandler.remove();
    }, []);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <ScrollView style={styles.scrollView}>
        <CollectionMenu />
        <View style={styles.item}>
            <View style={styles.itemText}>
                <Text style={styles.itemTitleText}>{itemObj.title}</Text>
                <Text style={styles.itemArtistText}>{itemObj.artistName}</Text>
            </View>
            <View>
                <Image style={styles.itemImage} source={{ uri: imgURL }} />
                <View style={styles.itemAdd}>
                    <Pressable style={styles.itemAddPress}>
                        <AddMenu museum={itemObj.museum} itemId={itemObj.id} itemObj={itemObj}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.itemText}>
                <Text style={styles.itemArtistText}>{itemObj.museumTitle}</Text>
                <Text style={styles.itemDescriptionText}>{itemObj.itemDescription}</Text>
            </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollView: {
    },
    item: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        width: '100%',
        textAlign:'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    itemTitleText: {
        fontSize: 20,
        textAlign:'center',
        fontWeight: '900',
        color: '#fff',
    },
    itemArtistText: {
        fontSize: 18,
        textAlign:'center',
        fontWeight: '400',
        color: '#fff',
    },
    itemDescriptionText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '300',
        color: '#fff',
    },
    itemImage: {
        borderWidth: 2.5,
        borderColor: '#3030dd',
        justifyContent: 'flex-start',
        borderRadius: 15,
        resizeMode: 'cover',
        width: windowDimensions.width - 20,
        height: windowDimensions.height / 2,
        maxWidth: windowDimensions.height / 2,
        maxHeight: windowDimensions.width - 20,
    },
    itemAdd: {
        position: 'absolute',
        top: 0, left: 0, bottom: 5, right: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    itemAddPress: {
        borderRadius: 10,
    
        backgroundColor: '#8080ff',
        height: 30,
        width: 70,

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

export default ItemView;