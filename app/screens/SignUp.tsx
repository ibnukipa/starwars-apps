import React, {useCallback, useRef} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Avatar,
  AvatarModal,
  BottomSheet,
  Button,
  InputText,
  InputTextSize,
  KeyboardAvoidingView,
  SecondaryHeader,
} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {RootStackParamList} from '../routes/types.ts';
import {Colors, Spaces} from '../constants';
import {useAuthStore} from '../stores';
import {
  CreateAccountForm,
  CreateAccountFormActions,
  createAccountFormInitialValues,
  createAccountFormReducer,
} from '../forms';
import {useAvatarPicker, useForm} from '../hooks';

const SignUp: React.FC<StackScreenProps<RootStackParamList, 'SignUp'>> = ({
  navigation,
}) => {
  const avatarPickerOptionRef = useRef<BottomSheet>(null);
  const [signUp, isSignUpLoading] = useAuthStore(state => [
    state.signUp,
    state.isSignUpLoading,
  ]);

  const [formState, formSetValue] = useForm<
    CreateAccountForm,
    CreateAccountFormActions
  >(createAccountFormReducer, createAccountFormInitialValues);

  const setAvatar = useCallback(
    (image: string) => {
      formSetValue('setAvatar')(image);
      avatarPickerOptionRef.current?.close();
    },
    [formSetValue],
  );

  const {avatarPickLibraryPress, avatarPickCameraPress} =
    useAvatarPicker(setAvatar);

  const avatarPickerOptionPress = useCallback(() => {
    avatarPickerOptionRef.current?.snapToIndex(0);
  }, []);

  const registerPress = useCallback(() => {
    signUp(formState).then(isSuccess => {
      if (isSuccess) {
        navigation.goBack();
      }
    });
  }, [formState, signUp, navigation]);

  return (
    <SafeAreaView edges={['left', 'right']} style={BaseStyle.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <KeyboardAvoidingView style={BaseStyle.flex}>
        <SecondaryHeader title={'Create New Account'} />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[BaseStyle.pad, styles.contentContainer]}>
          <SafeAreaView edges={['bottom']}>
            <View style={[BaseStyle.centered, styles.avatarContainer]}>
              <Avatar
                isDisabled={isSignUpLoading}
                uri={formState.avatar}
                onEditPress={avatarPickerOptionPress}
                placeholder={formState.nameAlias}
              />
            </View>
            <InputText
              isDisabled={isSignUpLoading}
              size={InputTextSize.SMALL}
              label={'Email'}
              onChangeText={formSetValue('setEmail')}
              placeholder={'john.doe@gmail.com'}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
            <View style={BaseStyle.divider} />
            <InputText
              isDisabled={isSignUpLoading}
              size={InputTextSize.SMALL}
              label={'First name'}
              onChangeText={formSetValue('setFirstName')}
              placeholder={'John'}
            />
            <InputText
              isDisabled={isSignUpLoading}
              size={InputTextSize.SMALL}
              label={'Last name'}
              onChangeText={formSetValue('setLastName')}
              placeholder={'Doe'}
            />
            <View style={BaseStyle.divider} />
            <InputText
              isDisabled={isSignUpLoading}
              size={InputTextSize.SMALL}
              label={'Password'}
              onChangeText={formSetValue('setPassword')}
              placeholder={'Password'}
              secureTextEntry
            />
            <InputText
              isDisabled={isSignUpLoading}
              size={InputTextSize.SMALL}
              label={'Confirm password'}
              onChangeText={formSetValue('setConfirmPassword')}
              placeholder={'Password'}
              secureTextEntry
            />
            <View style={BaseStyle.divider} />
            <InputText
              isDisabled={isSignUpLoading}
              size={InputTextSize.SMALL}
              label={'Job Title'}
              onChangeText={formSetValue('setJobTitle')}
              placeholder={'Jedi'}
            />
          </SafeAreaView>
        </ScrollView>
        <SafeAreaView
          style={[
            BaseStyle.pad,
            styles.contentContainer,
            BaseStyle.shadowFaceUp,
          ]}
          edges={['bottom']}>
          <Button
            isLoading={isSignUpLoading}
            isDisabled={!formState.isValid || formState.isEmpty}
            onPress={registerPress}
            style={BaseStyle.space}>
            Signup
          </Button>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <AvatarModal
        ref={avatarPickerOptionRef}
        cameraPress={avatarPickCameraPress}
        libraryPress={avatarPickLibraryPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: Spaces.presentationModal,
    backgroundColor: Colors.neutralWhite,
  },
  titleContainer: {
    justifyContent: 'space-between',
  },
  avatarContainer: {
    marginBottom: Spaces.regular,
  },
});

SignUp.displayName = 'SignUpScreen';

export default SignUp;
