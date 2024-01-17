import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {RouteContainer} from './app/routes';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RouteContainer />
    </SafeAreaProvider>
  );
}

export default App;
