import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextBody = props => {
  return <Text style={{...props.style,...styles.body}}>{props.children}</Text>
}
const styles = StyleSheet.create({
  body: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'open-sans-bold'
  }
});
export default TextBody;