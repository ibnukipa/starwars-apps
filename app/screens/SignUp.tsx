import React, {useCallback, useId} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Button,
  Icon,
  IconSize,
  InputText,
  InputTextSize,
  Text,
} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {RootStackParamList} from '../routes/types.ts';
import {Colors} from '../constants';
import {useAuthStore, useUserStore} from '../stores';
import {
  RegistrationForm,
  RegistrationFormActions,
  registrationFormInitialValues,
  registrationFormReducer,
} from '../forms';
import {useForm} from '../hooks';

const SignUp: React.FC<StackScreenProps<RootStackParamList, 'SignUp'>> = ({
  navigation,
}) => {
  const register = useUserStore(state => state.register);
  const registrationErrorMessage = useAuthStore(
    state => state.registrationErrorMessage,
  );
  const resetRegistrationErrorMessage = useAuthStore(
    state => state.resetRegistrationErrorMessage,
  );

  const tempId = useId();
  const [formState, formSetValue] = useForm<
    RegistrationForm,
    RegistrationFormActions
  >(registrationFormReducer, registrationFormInitialValues);

  const registerPress = useCallback(() => {
    console.log(tempId);
    console.log(formState);
  }, [formState, tempId]);

  return (
    <SafeAreaView edges={['left', 'right']} style={BaseStyle.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <View
        style={[
          BaseStyle.row,
          BaseStyle.verticalCentered,
          BaseStyle.headerContainer,
          BaseStyle.pad,
          styles.titleContainer,
        ]}>
        <Text
          fontWeight={'bold'}
          color={'citrusYellow'}
          style={[BaseStyle.heading3, BaseStyle.textUppercase]}>
          Create new account
        </Text>
        <Icon name={'close'} size={IconSize.HUGE} onPress={navigation.goBack} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={BaseStyle.pad}>
        <SafeAreaView edges={['bottom']}>
          <InputText
            size={InputTextSize.SMALL}
            label={'Email'}
            onChangeText={formSetValue('setEmail')}
            onFocus={resetRegistrationErrorMessage}
            placeholder={'john.doe@gmail.com'}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <View style={BaseStyle.divider} />
          <InputText
            size={InputTextSize.SMALL}
            label={'First name'}
            onChangeText={formSetValue('setFirstName')}
            onFocus={resetRegistrationErrorMessage}
            placeholder={'John'}
          />
          <InputText
            size={InputTextSize.SMALL}
            label={'Last name'}
            onChangeText={formSetValue('setLastName')}
            onFocus={resetRegistrationErrorMessage}
            placeholder={'Doe'}
          />
          <View style={BaseStyle.divider} />
          <InputText
            size={InputTextSize.SMALL}
            label={'Password'}
            onChangeText={formSetValue('setPassword')}
            onFocus={resetRegistrationErrorMessage}
            placeholder={'Password'}
            secureTextEntry
          />
          <InputText
            size={InputTextSize.SMALL}
            label={'Confirm password'}
            onChangeText={formSetValue('setConfirmPassword')}
            onFocus={resetRegistrationErrorMessage}
            placeholder={'Password'}
            secureTextEntry
          />
          <View style={BaseStyle.divider} />
          <InputText
            size={InputTextSize.SMALL}
            label={'Job Title'}
            onChangeText={formSetValue('setJobTitle')}
            onFocus={resetRegistrationErrorMessage}
            placeholder={'Jedi'}
          />
          <Button onPress={registerPress} style={BaseStyle.space}>
            Signup
          </Button>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
  },
  contentContainer: {},
});

SignUp.displayName = 'SignUpScreen';

export default SignUp;
