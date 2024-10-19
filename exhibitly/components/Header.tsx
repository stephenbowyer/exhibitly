import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';

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
    },
    headerText: {
      fontSize: 20,
      fontWeight: '600',
    },
});
export default Header;