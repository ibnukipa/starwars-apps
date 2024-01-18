import React, {useCallback, useRef} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Avatar,
  BottomSheet,
  Button,
  ButtonVariant,
  Icon,
  IconSize,
  InputText,
  InputTextSize,
  KeyboardAvoidingView,
  Text,
} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {RootStackParamList} from '../routes/types.ts';
import {Colors, FontSizes, Radii, Spaces} from '../constants';
import {useAuthStore} from '../stores';
import {
  RegistrationForm,
  RegistrationFormActions,
  registrationFormInitialValues,
  registrationFormReducer,
} from '../forms';
import {useAvatarPicker, useForm} from '../hooks';
import {BottomSheetView} from '@gorhom/bottom-sheet';

const SignUp: React.FC<StackScreenProps<RootStackParamList, 'SignUp'>> = ({
  navigation,
}) => {
  const avatarPickerOptionRef = useRef<BottomSheet>(null);
  const signUp = useAuthStore(state => state.signUp);

  const [formState, formSetValue] = useForm<
    RegistrationForm,
    RegistrationFormActions
  >(registrationFormReducer, registrationFormInitialValues);

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
    const isSuccess = signUp(formState);
    if (isSuccess) {
      navigation.goBack();
    }
  }, [formState, signUp, navigation]);

  return (
    <SafeAreaView edges={['left', 'right']} style={BaseStyle.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <KeyboardAvoidingView style={BaseStyle.flex}>
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
          <Icon
            name={'close'}
            size={IconSize.HUGE}
            onPress={navigation.goBack}
          />
        </View>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[BaseStyle.pad, styles.contentContainer]}>
          <SafeAreaView edges={['bottom']}>
            <View style={[BaseStyle.centered, styles.avatarContainer]}>
              <Avatar
                uri={formState.avatar}
                onEditPress={avatarPickerOptionPress}
                placeholder={formState.nameAlias}
              />
            </View>
            <InputText
              size={InputTextSize.SMALL}
              label={'Email'}
              onChangeText={formSetValue('setEmail')}
              placeholder={'john.doe@gmail.com'}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
            <View style={BaseStyle.divider} />
            <InputText
              size={InputTextSize.SMALL}
              label={'First name'}
              onChangeText={formSetValue('setFirstName')}
              placeholder={'John'}
            />
            <InputText
              size={InputTextSize.SMALL}
              label={'Last name'}
              onChangeText={formSetValue('setLastName')}
              placeholder={'Doe'}
            />
            <View style={BaseStyle.divider} />
            <InputText
              size={InputTextSize.SMALL}
              label={'Password'}
              onChangeText={formSetValue('setPassword')}
              placeholder={'Password'}
              secureTextEntry
            />
            <InputText
              size={InputTextSize.SMALL}
              label={'Confirm password'}
              onChangeText={formSetValue('setConfirmPassword')}
              placeholder={'Password'}
              secureTextEntry
            />
            <View style={BaseStyle.divider} />
            <InputText
              size={InputTextSize.SMALL}
              label={'Job Title'}
              onChangeText={formSetValue('setJobTitle')}
              placeholder={'Jedi'}
            />
            <Button
              isDisabled={!formState.isValid || formState.isEmpty}
              onPress={registerPress}
              style={BaseStyle.space}>
              Signup
            </Button>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomSheet ref={avatarPickerOptionRef}>
        <BottomSheetView>
          <SafeAreaView
            style={BaseStyle.pad}
            edges={['bottom', 'left', 'right']}>
            <View style={[BaseStyle.row, BaseStyle.spaceBetween]}>
              <Button
                onPress={avatarPickCameraPress}
                style={styles.avatarPickerButton}
                variant={ButtonVariant.TERTIARY}>
                <View style={styles.avatarPickerButtonContent}>
                  <Icon
                    isDisabled
                    size={IconSize.GIGANTIC}
                    color={'citrusYellowPlus1'}
                    name={'camera'}
                  />
                  <Text
                    color={'citrusYellowPlus1'}
                    fontWeight={'semiBold'}
                    style={styles.avatarPickerButtonContentText}>
                    Take from Camera
                  </Text>
                </View>
              </Button>
              <View style={BaseStyle.dividerVertical} />
              <Button
                onPress={avatarPickLibraryPress}
                style={styles.avatarPickerButton}
                variant={ButtonVariant.TERTIARY}>
                <View style={styles.avatarPickerButtonContent}>
                  <Icon
                    isDisabled
                    size={IconSize.GIGANTIC}
                    color={'citrusYellowPlus1'}
                    name={'gallery'}
                  />
                  <Text
                    color={'citrusYellowPlus1'}
                    fontWeight={'semiBold'}
                    style={styles.avatarPickerButtonContentText}>
                    Pick from Gallery
                  </Text>
                </View>
              </Button>
            </View>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: Spaces.presentationModal,
  },
  titleContainer: {
    justifyContent: 'space-between',
  },
  avatarContainer: {
    marginBottom: Spaces.regular,
  },
  avatarPickerButton: {
    borderWidth: 2,
    flex: 1,
    borderColor: Colors.citrusYellowPlus1,
    borderRadius: Radii.medium,
    paddingVertical: Spaces.medium,
  },
  avatarPickerButtonContent: {
    alignItems: 'center',
  },
  avatarPickerButtonContentText: {
    fontSize: FontSizes.regular,
  },
});

SignUp.displayName = 'SignUpScreen';

export default SignUp;
