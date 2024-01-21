import React, {useCallback, useRef} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';

import {
  Avatar,
  AvatarModal,
  BottomSheet,
  Button,
  InputText,
  InputTextMultiple,
  InputTextSize,
  KeyboardAvoidingView,
  SecondaryHeader,
} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {RootStackParamList} from '../routes/types.ts';
import {Colors, Spaces} from '../constants';
import {
  CreateGroupForm,
  CreateGroupFormActions,
  createGroupFormInitialValues,
  createGroupFormReducer,
} from '../forms';
import {useAvatarPicker, useForm} from '../hooks';
import useGroupStore from '../stores/groups.ts';

const GroupRegistration: React.FC<
  StackScreenProps<RootStackParamList, 'GroupRegistration'>
> = ({navigation}) => {
  const avatarPickerOptionRef = useRef<BottomSheet>(null);
  const [groupCreate, isGroupCreating] = useGroupStore(state => [
    state.create,
    state.isCreating,
  ]);

  const [formState, formSetValue] = useForm<
    CreateGroupForm,
    CreateGroupFormActions
  >(createGroupFormReducer, createGroupFormInitialValues);

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
    groupCreate(formState).then(isSuccess => {
      if (isSuccess) {
        navigation.goBack();
      }
    });
  }, [formState, groupCreate, navigation]);

  return (
    <SafeAreaView edges={['left', 'right']} style={BaseStyle.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <KeyboardAvoidingView style={BaseStyle.flex}>
        <SecondaryHeader
          title={'Create New Group'}
          colorScheme={'radiantOrchid'}
        />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[BaseStyle.pad, styles.contentContainer]}>
          <SafeAreaView edges={['bottom']}>
            <View style={[BaseStyle.centered, styles.avatarContainer]}>
              <Avatar
                colorScheme={'radiantOrchid'}
                isDisabled={isGroupCreating}
                uri={formState.avatar}
                onEditPress={avatarPickerOptionPress}
                placeholder={formState.nameAlias}
              />
            </View>
            <InputText
              isDisabled={isGroupCreating}
              size={InputTextSize.SMALL}
              label={'Name'}
              onChangeText={formSetValue('setName')}
              placeholder={'Rebel Alliance'}
            />
            <InputText
              isDisabled={isGroupCreating}
              size={InputTextSize.SMALL}
              label={'Description'}
              onChangeText={formSetValue('setDescription')}
              multiline
              placeholder={
                'A starship, also known as a starcruiser, spaceship, spacecraft, or simply just craft or ship.'
              }
            />
            <InputTextMultiple
              isDisabled={isGroupCreating}
              onChangeText={formSetValue('setInvitedMemberEmails')}
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
            colorScheme={'radiantOrchid'}
            isLoading={isGroupCreating}
            isDisabled={!formState.isValid || formState.isEmpty}
            onPress={registerPress}
            style={BaseStyle.space}>
            Create Group
          </Button>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <AvatarModal
        ref={avatarPickerOptionRef}
        colorScheme={'radiantOrchid'}
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
  avatarContainer: {
    marginBottom: Spaces.regular,
  },
});

GroupRegistration.displayName = 'GroupRegistrationScreen';

export default GroupRegistration;
