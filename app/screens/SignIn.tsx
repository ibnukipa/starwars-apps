import React, {useCallback} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Button, ButtonVariant, Text} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../routes/types.ts';

const SignIn: React.FC<StackScreenProps<RootStackParamList, 'SignIn'>> = ({
  navigation,
  route,
}) => {
  const navigateToSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <SafeAreaView style={[BaseStyle.container, BaseStyle.pad]}>
      <Text
        fontWeight={'extraBold'}
        color={'citrusYellow'}
        style={BaseStyle.title}>
        StarWars: Sign In
      </Text>
      <Text color={'neutralSecondaryText'} style={BaseStyle.subTitle}>
        Communication Apps
      </Text>
      <View>
        <Button
          onPress={route.params?.signInPress}
          style={BaseStyle.space}
          variant={ButtonVariant.PRIMARY}>
          Login
        </Button>
        <Button onPress={navigateToSignUp} style={BaseStyle.space} variant={ButtonVariant.SECONDARY}>
          Create a new account
        </Button>
      </View>
    </SafeAreaView>
  );
};

SignIn.displayName = 'SignInScreen';

export default SignIn;
