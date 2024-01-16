import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

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
      <Text style={styles.title}>StarWars</Text>
      <Text style={styles.subTitle}>Communication Apps</Text>
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
  title: {
    color: 'black',
    fontFamily: 'Dosis-ExtraBold',
    fontSize: 38,
  },
  subTitle: {
    color: 'black',
    fontFamily: 'Dosis-Regular',
    fontSize: 18,
  },
});

export default App;
