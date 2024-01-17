import React, {useCallback} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';

import {Home, SignIn, SignUp} from '../screens';
import {RootStackParamList} from './types.ts';
import {useAuthStore} from '../stores';

const RootStack = createStackNavigator<RootStackParamList>();
const RootScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

const ScreenModalPresentationOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  gestureEnabled: true,
};
const ScreenScaleCenterOptions: StackNavigationOptions = {
  ...TransitionPresets.ScaleFromCenterAndroid,
};
const ScreenSlideRightOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const RouteContainer: React.FC = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  const onNavigationReady = useCallback(() => {
    const init = async () => {
      // TODO prepare local database
      // TODO permission checks
      // TODO early internet checks
      // TODO handle deeplink/universal-link if any
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <NavigationContainer onReady={onNavigationReady}>
      <RootStack.Navigator screenOptions={RootScreenOptions}>
        {isLoggedIn ? (
          <>
            <RootStack.Screen
              name={'Home'}
              component={Home}
              options={ScreenSlideRightOptions}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name={'SignIn'}
              component={SignIn}
              options={ScreenScaleCenterOptions}
            />
            <RootStack.Screen
              name={'SignUp'}
              component={SignUp}
              options={ScreenModalPresentationOptions}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

RouteContainer.displayName = 'RouteContainer';

export default RouteContainer;
