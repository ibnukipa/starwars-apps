import React from 'react';
import {View} from 'react-native';

import {BaseStyle} from '../../styles/base.ts';
import {Text} from '../Text';
import styles from './styles.ts';
import {Avatar, AvatarSize} from '../Avatar';
import {Button, ButtonSize, ButtonVariant} from '../Button';
import {IColorSchemes} from '../../constants';
import {useColorScheme} from '../../hooks';

export interface ItemGroupProps {
  colorScheme?: IColorSchemes;
}

const ItemGroup: React.FC<ItemGroupProps> = ({
  colorScheme = 'citrusYellow',
}) => {
  const {min4Color, mainColor} = useColorScheme(colorScheme);

  return (
    <View
      style={[
        BaseStyle.row,
        BaseStyle.verticalCentered,
        styles.group,
        {backgroundColor: min4Color},
      ]}>
      <View style={BaseStyle.padTinyRight}>
        <Avatar colorScheme={colorScheme} size={AvatarSize.SMALL} />
      </View>
      <Text
        numberOfLines={2}
        fontWeight={'medium'}
        style={[BaseStyle.flex, BaseStyle.padTinyRight, styles.groupName]}>
        Rebel Alliance
      </Text>
      <View style={[BaseStyle.row]}>
        <View
          style={[
            BaseStyle.padTinyRight,
            styles.groupMember,
            {borderColor: mainColor},
          ]}>
          <Text bold>13</Text>
        </View>
        <Button
          colorScheme={'jadeGreen'}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.TINY}>
          ACCEPT
        </Button>
      </View>
    </View>
  );
};

export default ItemGroup;
