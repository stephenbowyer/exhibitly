import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Dimensions, BackHandler, Pressable} from 'react-native';
import { useParams, useNavigate } from "react-router-native";
import { fetchItem } from '../utils';

const windowDimensions = Dimensions.get('window');

const ItemView:FC = ()  => {
    const {item_id} = useParams();
    const [dimensions, setDimensions] = useState({window: windowDimensions});
    const [itemObj, setItemObj] = useState(new Array());
    const [imgURL, setImgURL] = useState("./assets/icon.png");
    const navigate = useNavigate();

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window}) => {setDimensions({window})},
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
            <View style={styles.itemText}>
                <Text style={styles.itemTitleText}>{itemObj.title}</Text>
                <Text style={styles.itemArtistText}>{itemObj.artist_title}</Text>
            </View>
            <Image style={styles.itemImage} source={{ uri: imgURL }} />
            <View style={styles.itemAdd}>
                <Pressable style={styles.itemAddPress}>
                    <Text style={styles.itemAddText}>Add</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        width: windowDimensions.width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        width: windowDimensions.width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    itemTitleText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#fff',
    },
    itemArtistText: {
        fontSize: 18,
        fontWeight: '400',
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
        top: 0, left: 0, bottom: 33, right: 10,
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

export default ItemView;