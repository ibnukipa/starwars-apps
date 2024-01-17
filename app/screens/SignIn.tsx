import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';

import {
  Button,
  ButtonVariant,
  Text,
  showToast,
  KeyboardAvoidingView,
  InputText,
} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {RootStackParamList} from '../routes/types.ts';
import {useAuthStore} from '../stores';
import {Colors, Radii, Spaces} from '../constants';
import {useForm, useKeyboardAppearance} from '../hooks';
import {
  loginFormReducer,
  loginFormInitialValues,
  LoginForm,
  LoginFormActions,
} from '../forms';

const SignIn: React.FC<StackScreenProps<RootStackParamList, 'SignIn'>> = ({
  navigation,
}) => {
  const login = useAuthStore(state => state.login);
  const errorMessage = useAuthStore(state => state.errorMessage);
  const resetErrorMessage = useAuthStore(state => state.resetErrorMessage);

  const [formState, formSetValue] = useForm<LoginForm, LoginFormActions>(
    loginFormReducer,
    loginFormInitialValues,
  );

  const isKeyboardShowed = useKeyboardAppearance();

  useEffect(() => {
    if (errorMessage) {
      showToast({
        message: errorMessage,
      });
    }
  }, [errorMessage]);

  const signInPress = useCallback(() => {
    if (formState.email && formState.password) {
      login(formState.email, formState.password);
    }
  }, [login, formState]);

  const signUpPress = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <SafeAreaView style={BaseStyle.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <KeyboardAvoidingView
        style={[
          BaseStyle.pad,
          BaseStyle.keyboardAvoidingContainer,
          styles.container,
        ]}>
        {!isKeyboardShowed && (
          <View style={styles.titleContainer}>
            <Text
              fontWeight={'extraBold'}
              color={'citrusYellow'}
              style={[BaseStyle.title, BaseStyle.textCenter]}>
              StarWars
            </Text>
            <Text
              color={'neutralSecondaryText'}
              style={[BaseStyle.subTitle, BaseStyle.textCenter]}>
              Communication Apps
            </Text>
          </View>
        )}
        <View style={styles.formContainer}>
          <InputText
            onChangeText={formSetValue('setEmail')}
            onFocus={resetErrorMessage}
            placeholderTextColor={Colors.neutralPlaceholderText}
            placeholder={'Your e-mail address'}
          />
          <InputText
            onChangeText={formSetValue('setPassword')}
            onFocus={resetErrorMessage}
            placeholder={'Password'}
            secureTextEntry
          />
          <Button
            isDisabled={!formState.email || !formState.password}
            onPress={signInPress}
            style={BaseStyle.space}
            variant={ButtonVariant.PRIMARY}>
            Login
          </Button>
          <Button
            onPress={signUpPress}
            style={BaseStyle.space}
            variant={ButtonVariant.SECONDARY}>
            Create a new account
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  titleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '5%',
  },
  formContainer: {
    padding: Spaces.regular,
    borderRadius: Radii.large,
    borderWidth: 0.5,
    borderColor: Colors.neutralContainer,
    shadowColor: Colors.neutralPlaceholderText,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: Colors.neutralWhite,
  },
});

SignIn.displayName = 'SignInScreen';

export default SignIn;
