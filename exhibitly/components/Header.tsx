import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

const Header:FC = ()  => {
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
      width: '100%',
    },
    headerText: {
      fontSize: 20,
      fontWeight: '600',
      color: '#fff'
    },
});
export default Header;