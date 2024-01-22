import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';

import {BaseStyle} from '../../../styles/base.ts';
import {Text} from '../../Text';
import styles from './styles.ts';
import {Avatar, AvatarSize} from '../../Avatar';
import {Button, ButtonSize, ButtonVariant} from '../../Button';
import {IColorSchemes} from '../../../constants';
import {useColorScheme, useMemberStatusInGroup} from '../../../hooks';
import useGroupStore from '../../../stores/groups.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../routes/types.ts';

export interface GroupItemProps {
  id: string;
}

const GroupItemAction: React.FC<{
  groupId: string;
  isOwner: boolean;
  isInvited: boolean;
  isMember: boolean;
}> = ({groupId, isOwner, isMember, isInvited}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [accept, removeOrLeaveMember, isAccepting, isRemovingOrLeavingMember] =
    useGroupStore(state => {
      return [
        state.accept,
        state.removeOrLeaveMember,
        state.isAccepting,
        state.isRemovingOrLeavingMember,
      ];
    });
  const [colorScheme, text, isDisabled] = useMemo<
    [IColorSchemes | undefined, string | undefined, boolean | undefined]
  >(() => {
    if (isOwner) {
      return ['radiantOrchid', 'owner', true];
    } else if (isInvited) {
      return ['jadeGreen', 'accept', false];
    } else if (isMember) {
      return ['crimsonRed', 'leave', false];
    }

    return [undefined, undefined, undefined];
  }, [isOwner, isMember, isInvited]);

  const onPress = useCallback(() => {
    if (isInvited) {
      accept(groupId);
    } else if (isMember) {
      removeOrLeaveMember(groupId);
    }
  }, [accept, groupId, isInvited, isMember, removeOrLeaveMember]);

  const openPress = useCallback(() => {
    navigation.navigate('Group', {id: groupId});
  }, [navigation, groupId]);

  if (!text) {
    return null;
  }

  return (
    <View>
      <Button
        isLoading={isAccepting || isRemovingOrLeavingMember}
        onPress={onPress}
        isDisabled={isDisabled}
        colorScheme={colorScheme}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.TINY}>
        {text?.toUpperCase()}
      </Button>
      <View style={BaseStyle.dividerPlainTiny} />
      <Button
        onPress={openPress}
        colorScheme={'radiantOrchid'}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.TINY}>
        Open
      </Button>
    </View>
  );
};

const GroupItem: React.FC<GroupItemProps> = ({id}) => {
  const {isOwner, isMember, isInvited, group} = useMemberStatusInGroup(id);
  const colorScheme = useMemo<IColorSchemes>(() => {
    if (isOwner) {
      return 'radiantOrchid';
    } else if (isMember) {
      return 'rustySand';
    } else if (isInvited) {
      return 'jadeGreen';
    }

    return 'gray';
  }, [isInvited, isMember, isOwner]);

  const {min4Color} = useColorScheme(colorScheme);

  if (!group) {
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
          uri={group.avatar}
          placeholder={group.nameAlias}
          colorScheme={colorScheme}
          size={AvatarSize.SMALL}
        />
      </View>
      <View style={[BaseStyle.flex, BaseStyle.padTinyRight]}>
        <Text numberOfLines={2} fontWeight={'medium'} style={styles.groupName}>
          {group.name}
        </Text>
        <View style={BaseStyle.row}>
          <Text>{group.memberIds.length} members</Text>
          {isOwner && group.invitedMemberIds.length > 0 && (
            <Text> &#x2022; {group.invitedMemberIds.length} pending</Text>
          )}
        </View>
      </View>
      <GroupItemAction
        groupId={group.id}
        isOwner={isOwner}
        isInvited={isInvited}
        isMember={isMember}
      />
    </View>
  );
};

export default GroupItem;
