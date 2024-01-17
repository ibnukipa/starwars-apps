import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {RouteContainer} from './app/routes';
import {Toast, ToastRef} from './app/components';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RouteContainer />
      <Toast ref={ToastRef} />
    </SafeAreaProvider>
  );
}

export default App;
