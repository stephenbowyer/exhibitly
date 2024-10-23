import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Dimensions, BackHandler, Alert} from 'react-native';
import { useParams, useNavigate } from "react-router-native";
import { fetchItem } from '../utils';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const ItemView:FC = ()  => {
    const {item_id} = useParams();
    const [dimensions, setDimensions] = useState({window: windowDimensions, screen: screenDimensions});
    const [itemObj, setItemObj] = useState(new Array());
    const [imgURL, setImgURL] = useState("./assets/icon.png");
    const navigate = useNavigate();

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window, screen}) => {setDimensions({window, screen})},
        );
        return () => subscription?.remove();
      });

    useEffect(() => {
        fetchItem(item_id).then(item => {
            setItemObj(item.data);
            if (item.data.image_id)
                setImgURL('https://www.artic.edu/iiif/2/'+item.data.image_id+'/full/843,/0/default.jpg');
            else
                setImgURL("./assets/icon.png");
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
    
    console.log(imgURL);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={styles.item}>
            <Text style={styles.itemTitleText}>{itemObj.title}</Text>
            <Text style={styles.itemArtistText}>{itemObj.artist_title}</Text>
            <Image style={styles.itemImage} source={{ uri: imgURL }} />
            <View style={styles.itemAdd}>
                <Text style={styles.itemAddText}>Add</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        position: 'absolute',
        top: 25,
//        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 20,
        fontWeight: '300',
//        borderWidth: 1,
    },
    itemTitleText: {
        fontSize: 20,
        fontWeight: '600',
    },
    itemArtistText: {
        fontSize: 18,
        fontWeight: '300',
    },
    itemImage: {
//        borderWidth: 1,
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
        top: 0, left: 0, right: 10, bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    itemAddText: {
        fontSize: 20,
        fontWeight: '600'
    }
});

export default ItemView;