import React, {useMemo} from 'react';
import {View} from 'react-native';

import {BaseStyle} from '../../styles/base.ts';
import {Text} from '../Text';
import styles from './styles.ts';
import {Avatar, AvatarSize} from '../Avatar';
import {Button, ButtonSize, ButtonVariant} from '../Button';
import {IColorSchemes} from '../../constants';
import {useColorScheme} from '../../hooks';
import useGroupStore, {Group} from '../../stores/groups.ts';

export interface ItemGroupProps extends Group {}

const ItemGroupAction: React.FC<{
  isOwner: boolean;
  isInvited: boolean;
  isMember: boolean;
}> = ({isOwner, isMember, isInvited}) => {
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

  if (!text) {
    return null;
  }

  return (
    <Button
      style={isOwner ? BaseStyle.flexEnd : undefined}
      isDisabled={isDisabled}
      colorScheme={colorScheme}
      variant={ButtonVariant.SECONDARY}
      size={isOwner ? ButtonSize.TINY : ButtonSize.SMALL}>
      {text?.toUpperCase()}
    </Button>
  );
};

const ItemGroup: React.FC<ItemGroupProps> = props => {
  const [getIsOwner, getIsMember, getIsInvited] = useGroupStore(state => [
    state.getIsOwner,
    state.getIsMember,
    state.getIsInvited,
  ]);

  const isOwner = useMemo(() => getIsOwner(props), [getIsOwner, props]);
  const isMember = useMemo(() => getIsMember(props), [getIsMember, props]);
  const isInvited = useMemo(() => getIsInvited(props), [getIsInvited, props]);

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
          placeholder={props.nameAlias}
          colorScheme={colorScheme}
          size={AvatarSize.SMALL}
        />
      </View>
      <View style={[BaseStyle.flex, BaseStyle.padTinyRight]}>
        <Text numberOfLines={2} fontWeight={'medium'} style={styles.groupName}>
          {props.name}
        </Text>
        <View style={BaseStyle.row}>
          <Text>{props.memberIds.length} members</Text>
          {isOwner && props.invitedMemberIds.length > 0 && (
            <Text> &#x2022; {props.invitedMemberIds.length} pending</Text>
          )}
        </View>
      </View>
      <ItemGroupAction
        isOwner={isOwner}
        isInvited={isInvited}
        isMember={isMember}
      />
    </View>
  );
};

export default ItemGroup;
