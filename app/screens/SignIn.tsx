import React, {useCallback} from 'react';
import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';

import {
  Button,
  ButtonVariant,
  Text,
  InputText,
  KeyboardAvoidingView,
} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {RootStackParamList} from '../routes/types.ts';
import {useAuthStore} from '../stores';
import {Colors, Radii, Spaces} from '../constants';
import {useForm} from '../hooks';
import {
  loginFormReducer,
  loginFormInitialValues,
  LoginForm,
  LoginFormActions,
} from '../forms';

const SignIn: React.FC<StackScreenProps<RootStackParamList, 'SignIn'>> = ({
  navigation,
}) => {
  const [signIn, isSignInLoading] = useAuthStore(state => [
    state.signIn,
    state.isSignInLoading,
  ]);

  const [formState, formSetValue] = useForm<LoginForm, LoginFormActions>(
    loginFormReducer,
    loginFormInitialValues,
  );

  const signInPress = useCallback(() => {
    signIn(formState);
  }, [signIn, formState]);

  const signUpPress = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <SafeAreaView edges={['left', 'right']} style={BaseStyle.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <KeyboardAvoidingView style={BaseStyle.flex}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[BaseStyle.pad, styles.contentContainer]}>
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
          <View style={styles.formContainer}>
            <InputText
              isDisabled={isSignInLoading}
              onChangeText={formSetValue('setEmail')}
              placeholderTextColor={Colors.neutralPlaceholderText}
              placeholder={'Your e-mail address'}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
            <InputText
              isDisabled={isSignInLoading}
              onChangeText={formSetValue('setPassword')}
              placeholder={'Password'}
              secureTextEntry
            />
            <Button
              isLoading={isSignInLoading}
              isDisabled={!formState.isValid || formState.isEmpty}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: '40%',
    paddingBottom: Spaces.presentationModal,
  },
  titleContainer: {
    alignSelf: 'center',
    marginBottom: Spaces.large,
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
