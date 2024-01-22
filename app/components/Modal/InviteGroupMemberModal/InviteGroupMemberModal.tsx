import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {View} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';

import {BaseStyle} from '../../../styles/base.ts';
import {BottomSheet} from '../../BottomSheet';
import {SecondaryHeaderWithInSheet} from '../../Header';
import styles from './styles.ts';
import {InputTextMultiple} from '../../Input';
import {useForm} from '../../../hooks';
import {
  InviteGroupMemberForm,
  InviteGroupMemberFormActions,
  inviteGroupMemberFormInitialValues,
  inviteGroupMemberFormReducer,
} from '../../../forms';
import useGroupStore from '../../../stores/groups.ts';
import {Button} from '../../Button';

export interface InviteGroupMemberModalProps {
  groupId: string;
}

type InviteGroupMemberModal = BottomSheet;

const InviteGroupMemberModal = forwardRef<
  BottomSheet,
  InviteGroupMemberModalProps
>(({groupId}, ref) => {
  const thisModal = useRef<InviteGroupMemberModal>(null);
  const [isShowForm, setIsShowForm] = useState<boolean>(false);

  const [isInvitingMember, inviteMember] = useGroupStore(state => [
    state.isInvitingMember,
    state.inviteMember,
  ]);

  const [formState, formSetValue] = useForm<
    InviteGroupMemberForm,
    InviteGroupMemberFormActions
  >(inviteGroupMemberFormReducer, inviteGroupMemberFormInitialValues);

  const invitePress = useCallback(() => {
    inviteMember(groupId, formState).then(isSuccess => {
      if (isSuccess) {
        thisModal.current?.close();
      }
    });
  }, [formState, groupId, inviteMember]);

  const onChange = useCallback((index: number) => {
    if (index === -1) {
      setIsShowForm(false);
    }
  }, []);

  const onAnimate = useCallback((_fromIndex: number, toIndex: number) => {
    if (toIndex > -1) {
      setIsShowForm(true);
    }
  }, []);

  // TODO fix the ref and thisModal type
  // @ts-ignore
  useImperativeHandle(ref, () => thisModal.current);

  return (
    <BottomSheet
      ref={thisModal}
      onChange={onChange}
      onAnimate={onAnimate}
      style={BaseStyle.shadowFaceUp}
      index={-1}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      keyboardBehavior={'interactive'}
      keyboardBlurBehavior={'restore'}
      snapPoints={['75%']}>
      <SecondaryHeaderWithInSheet
        title={'Invite Member'}
        colorScheme={'radiantOrchid'}
      />
      <BottomSheetScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[BaseStyle.pad, styles.container]}>
        {isShowForm && (
          <SafeAreaView edges={['bottom']}>
            <InputTextMultiple
              isBottomSheet
              isDisabled={isInvitingMember}
              onChangeText={formSetValue('setInvitedMemberEmails')}
            />
          </SafeAreaView>
        )}
      </BottomSheetScrollView>
      <View style={[BaseStyle.pad, styles.container, BaseStyle.shadowFaceUp]}>
        <Button
          colorScheme={'radiantOrchid'}
          isLoading={isInvitingMember}
          isDisabled={!formState.isValid || formState.isEmpty}
          onPress={invitePress}
          style={BaseStyle.space}>
          Invite New Member
        </Button>
      </View>
    </BottomSheet>
  );
});

InviteGroupMemberModal.displayName = 'InviteGroupMemberModal';

export default InviteGroupMemberModal;
