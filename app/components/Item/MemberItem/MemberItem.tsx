import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';

import {useAuthStore, useUserStore} from '../../../stores';
import {useColorScheme, useMemberStatusInGroup} from '../../../hooks';
import {IColorSchemes} from '../../../constants';
import {BaseStyle} from '../../../styles/base.ts';
import styles from '../GroupItem/styles.ts';
import {Avatar, AvatarSize} from '../../Avatar';
import {Text} from '../../Text';
import {Button, ButtonSize, ButtonVariant} from '../../Button';
import useGroupStore from '../../../stores/groups.ts';

export interface MemberItemProps {
  id: string;
  groupId: string;
}

const MemberItemAction: React.FC<{
  ownerId: string;
  isOwner: boolean;
  isInvited: boolean;
  isMember: boolean;
  groupId: string;
  memberEmail: string;
  memberId: string;
}> = ({
  isOwner,
  isMember,
  isInvited,
  ownerId,
  groupId,
  memberEmail,
  memberId,
}) => {
  const currentUser = useAuthStore(state => state.user);
  const [
    removeMember,
    isRemovingOrLeavingMember,
    cancelMember,
    isCancellingMember,
    accept,
    isAccepting,
  ] = useGroupStore(state => [
    state.removeOrLeaveMember,
    state.isRemovingOrLeavingMember,
    state.cancelMember,
    state.isCancellingMember,
    state.accept,
    state.isAccepting,
  ]);
  const isCurrentUserOwner = useMemo(() => {
    return ownerId === currentUser?.id;
  }, [ownerId, currentUser?.id]);
  const isCurrentUserMember = useMemo(() => {
    return memberId === currentUser?.id;
  }, [currentUser?.id, memberId]);
  const [buttonTitle, colorScheme] = useMemo<
    [string | undefined, IColorSchemes | undefined]
  >(() => {
    if (isCurrentUserOwner) {
      if (isOwner) {
        return ['owner', 'victoriaBlue'];
      } else if (isMember) {
        return ['remove', 'crimsonRed'];
      } else if (isInvited) {
        return ['cancel', 'crimsonRed'];
      }

      return [undefined, undefined];
    } else {
      if (isOwner) {
        return ['owner', 'victoriaBlue'];
      } else if (isInvited && isCurrentUserMember) {
        return ['accept', 'jadeGreen'];
      }

      return [undefined, undefined];
    }
  }, [isCurrentUserOwner, isOwner, isMember, isInvited, isCurrentUserMember]);

  const isOwnerCheck = useMemo(() => {
    return !isCurrentUserOwner || isOwner;
  }, [isCurrentUserOwner, isOwner]);

  const isCurrentUserInvited = useMemo(() => {
    return isInvited && isCurrentUserMember;
  }, [isCurrentUserMember, isInvited]);

  const ownerOnPress = useCallback(() => {
    if (isInvited) {
      cancelMember(groupId, memberEmail);
    } else if (isMember && !isOwner) {
      removeMember(groupId, memberEmail);
    }
  }, [
    cancelMember,
    groupId,
    isInvited,
    isMember,
    isOwner,
    memberEmail,
    removeMember,
  ]);

  const currentUserInvitedPress = useCallback(() => {
    accept(groupId);
  }, [accept, groupId]);

  if (!buttonTitle) {
    return null;
  }

  return (
    <Button
      isLoading={isCancellingMember || isRemovingOrLeavingMember || isAccepting}
      style={isOwnerCheck && BaseStyle.flexEnd}
      onPress={
        isOwnerCheck
          ? isCurrentUserInvited
            ? currentUserInvitedPress
            : undefined
          : ownerOnPress
      }
      colorScheme={colorScheme}
      variant={ButtonVariant.TERTIARY}
      size={
        isOwnerCheck && !isCurrentUserInvited
          ? ButtonSize.TINY
          : ButtonSize.SMALL
      }>
      {buttonTitle}
    </Button>
  );
};

const MemberItem: React.FC<MemberItemProps> = ({id, groupId}) => {
  const member = useUserStore(state =>
    Object.values(state.users).find(user => user.id === id),
  );
  const {isOwner, isMember, isInvited, ownerId} = useMemberStatusInGroup(
    groupId,
    member,
  );

  const colorScheme = useMemo<IColorSchemes>(() => {
    if (isOwner) {
      return 'victoriaBlue';
    } else if (isMember) {
      return 'jadeGreen';
    } else if (isInvited) {
      return 'gray';
    }

    return 'gray';
  }, [isInvited, isMember, isOwner]);
  const {min4Color} = useColorScheme(colorScheme);

  if (!member) {
    return null;
  }

  return (
    <View
      style={[
        BaseStyle.row,
        BaseStyle.verticalCentered,
        styles.group,
        {backgroundColor: min4Color},
      ]}>
      <View style={BaseStyle.padTinyRight}>
        <Avatar
          uri={member.avatar}
          placeholder={member.nameAlias}
          colorScheme={colorScheme}
          size={AvatarSize.TINY}
        />
      </View>
      <View style={[BaseStyle.flex, BaseStyle.padTinyRight]}>
        <Text numberOfLines={2} fontWeight={'medium'} style={styles.groupName}>
          {member.firstName} {member.lastName}
        </Text>
      </View>
      <MemberItemAction
        groupId={groupId}
        memberId={member.id}
        memberEmail={member.email}
        ownerId={ownerId}
        isOwner={isOwner}
        isInvited={isInvited}
        isMember={isMember}
      />
    </View>
  );
};

MemberItem.displayName = 'MemberItem';

export default MemberItem;
