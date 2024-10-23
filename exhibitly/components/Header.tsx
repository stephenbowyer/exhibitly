import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
const windowDimensions = Dimensions.get('window');

const Header:FC = ()  => {
    const [dimensions, setDimensions] = useState({window: windowDimensions});

    useEffect(() => {
      const subscription = Dimensions.addEventListener(
        'change',
        ({window}) => {setDimensions({window})},
      );
      return () => subscription?.remove();
    });

    return (
        <View style={styles.header}>
        <Text style={styles.headerText}>exhibitly</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
      paddingVertical: 20,
      alignItems: 'center',
      backgroundColor: '#3030dd',
      color: '#fff',
      width: windowDimensions.width,
    },
    headerText: {
      fontSize: 20,
      fontWeight: '600',
      color: '#fff'
    },
});
export default Header;