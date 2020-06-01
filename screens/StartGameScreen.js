import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import TextTitle from '../components/TextTitle';
import TextBody from '../components/TextBody';
import ButtonMain from '../components/ButtonMain';
import Colors from '../constants/colors';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  const inputNumberHandler = number => {
    setEnteredValue(number.replace(/[^0-9]/g, ''));
  }
  const resetInputHandler = () => {
    setEnteredValue('');
  }
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return;
    }
    Keyboard.dismiss();
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  }
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = <Card style={styles.summaryContainer}>
      <TextBody>You selected</TextBody>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <ButtonMain onPress={() => props.onStartGame(selectedNumber)}>
        Start Game
      </ButtonMain>
    </Card>
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TextTitle style={styles.title}>Start a New Game!</TextTitle>
            <Card style={styles.inputContainer}>
              <TextBody>Select a Number</TextBody>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                value={enteredValue}
                onChangeText={inputNumberHandler}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button title="Reset" onPress={resetInputHandler} color={Colors.secondary} />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  // button: {
  //   width: Dimensions.get('window').width / 4
  // },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    alignItems: "center",
    marginTop: 20,
  }
});
export default StartGameScreen