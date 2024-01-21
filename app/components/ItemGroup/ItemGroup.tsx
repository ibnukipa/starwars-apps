import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';

import {BaseStyle} from '../../styles/base.ts';
import {Text} from '../Text';
import styles from './styles.ts';
import {Avatar, AvatarSize} from '../Avatar';
import {Button, ButtonSize, ButtonVariant} from '../Button';
import {IColorSchemes} from '../../constants';
import {useColorScheme} from '../../hooks';
import useGroupStore from '../../stores/groups.ts';

export interface ItemGroupProps {
  id: string;
}

const ItemGroupAction: React.FC<{
  groupId: string;
  isOwner: boolean;
  isInvited: boolean;
  isMember: boolean;
}> = ({groupId, isOwner, isMember, isInvited}) => {
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

  if (!text) {
    return null;
  }

  return (
    <Button
      isLoading={isAccepting || isRemovingOrLeavingMember}
      onPress={onPress}
      style={isOwner ? BaseStyle.flexEnd : undefined}
      isDisabled={isDisabled}
      colorScheme={colorScheme}
      variant={ButtonVariant.SECONDARY}
      size={isOwner ? ButtonSize.TINY : ButtonSize.SMALL}>
      {text?.toUpperCase()}
    </Button>
  );
};

const ItemGroup: React.FC<ItemGroupProps> = ({id}) => {
  const [getIsOwner, getIsMember, getIsInvited, group] = useGroupStore(
    state => [
      state.getIsOwner,
      state.getIsMember,
      state.getIsInvited,
      state.groups[id],
    ],
  );

  const isOwner = useMemo(() => getIsOwner(group), [getIsOwner, group]);
  const isMember = useMemo(() => getIsMember(group), [getIsMember, group]);
  const isInvited = useMemo(() => getIsInvited(group), [getIsInvited, group]);

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
      <ItemGroupAction
        groupId={group.id}
        isOwner={isOwner}
        isInvited={isInvited}
        isMember={isMember}
      />
    </View>
  );
};

export default ItemGroup;
