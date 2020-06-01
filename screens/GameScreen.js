import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet,
  Button, Alert, ScrollView, FlatList,
  Dimensions
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TextBody from '../components/TextBody';
import ButtonMain from '../components/ButtonMain';
import { Ionicons } from '@expo/vector-icons';

const generateRandomNumberBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  return randNum === exclude
    ? generateRandomNumberBetween(min, max, exclude)
    : randNum;
}

const renderListItem = (value, roundNum) => (
  <View key={value} style={styles.listItem}>
    <TextBody>#{roundNum} </TextBody>
    <TextBody>{value}</TextBody>
  </View>
)
const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomNumberBetween(1, 100, props.userChoice));
  const [guessList, setGuessList] = useState([currentGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guessList.length);
    }
  }, [currentGuess, userChoice, onGameOver])

  useEffect(()=>{
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    }
    Dimensions.addEventListener('change',updateLayout);
    return () => {
      Dimensions.removeEventListener('change',updateLayout);
    }
  })

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess <= props.userChoice) || (direction === 'greater' && currentGuess >= props.userChoice)) {
      Alert.alert(
        'Don\'t lie!',
        'You know that this is wrong...',
        [{ text: 'Sorry!', style: 'cancel' }]
      )
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess - 1;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomNumberBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setGuessList(prevList => [nextNumber, ...prevList]);
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <TextBody>Computer's Guess</TextBody>
        <View style={styles.controls}>
          <ButtonMain onPress={() => { nextGuessHandler('lower') }}>
            <Ionicons name='md-remove' size={24} color="white" />
          </ButtonMain>
          <NumberContainer>{currentGuess}</NumberContainer>
          <ButtonMain onPress={() => { nextGuessHandler('greater') }}>
            <Ionicons name='md-add' size={24} color="white" />
          </ButtonMain>
        </View>
        <View style={{...styles.listContainer, width: availableDeviceWidth < 350 ? '80%' : '60%'}}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {guessList.map((guess, index) => renderListItem(guess, guessList.length - index))}
          </ScrollView> */}
          <FlatList
            contentContainerStyle={styles.list}
            data={guessList}
            renderItem={itemData => renderListItem(itemData.item, guessList.length - itemData.index)}
            keyExtractor={item => item.toString()}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <TextBody>Computer's Guess</TextBody>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <ButtonMain onPress={() => { nextGuessHandler('lower') }}>
          <Ionicons name='md-remove' size={24} color="white" />
        </ButtonMain>
        <ButtonMain onPress={() => { nextGuessHandler('greater') }}>
          <Ionicons name='md-add' size={24} color="white" />
        </ButtonMain>
      </Card>
      <View style={{...styles.listContainer, width: availableDeviceWidth < 350 ? '80%' : '60%'}}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {guessList.map((guess, index) => renderListItem(guess, guessList.length - index))}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          data={guessList}
          renderItem={itemData => renderListItem(itemData.item, guessList.length - itemData.index)}
          keyExtractor={item => item.toString()}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%'
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '100%'
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '50%',
    alignItems: 'center',
  }
});
export default GameScreen;