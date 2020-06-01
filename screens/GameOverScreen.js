import React from 'react';
import {
  View, StyleSheet, Button, Image, Text,
  Dimensions, ScrollView
} from 'react-native';
import TextTitle from '../components/TextTitle';
import TextBody from '../components/TextBody';
import ButtonMain from '../components/ButtonMain';
import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TextTitle>The Game is Over!</TextTitle>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/success.png')}
          />
        </View>
        <View style={styles.resultContainer}>
          <TextBody style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> round(s) to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></TextBody>
        </View>
        <ButtonMain onPress={props.onRestart}>New Game</ButtonMain>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    maxHeight: 300,
    maxWidth: 300,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').width > 350 ? 30 : 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
  resultContainer: {
    width: 300,
    marginBottom: Dimensions.get('window').width > 350 ? 20 : 10,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
});
export default GameOverScreen;