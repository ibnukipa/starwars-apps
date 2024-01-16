import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {Button, ButtonVariant, Text} from './app/components';

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      //
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        fontWeight={'extraBold'}
        color={'citrusYellow'}
        style={styles.title}>
        StarWars
      </Text>
      <Text color={'neutralSecondaryText'} style={styles.subTitle}>
        Communication Apps
      </Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button}>Press me</Button>
        <Button style={styles.button} variant={ButtonVariant.SECONDARY}>
          Press me
        </Button>
        <Button style={styles.button} variant={ButtonVariant.TERTIARY}>
          Press me
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 16,
    width: '100%',
  },
  button: {
    marginVertical: 8,
  },
  title: {
    fontSize: 38,
  },
  subTitle: {
    fontSize: 18,
  },
});

export default App;
