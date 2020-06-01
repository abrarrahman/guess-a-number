import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import TextTitle from './TextTitle';

const Header = props => {
  return (
    <View style={styles.header}>
      <TextTitle>{props.title}</TextTitle>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 36,
    height: 90,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
export default Header