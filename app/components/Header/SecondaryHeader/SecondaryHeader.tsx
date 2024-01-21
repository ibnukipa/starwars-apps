import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {BaseStyle} from '../../../styles/base.ts';
import {Text} from '../../Text';
import {Icon, IconSize} from '../../Icon';
import styles from './styles.ts';
import {IColorSchemes} from '../../../constants';
import {useColorScheme} from '../../../hooks';
import {Avatar, AvatarSize} from '../../Avatar';

export interface SecondaryHeaderProps {
  title: string;
  avatar?: string;
  colorScheme?: IColorSchemes;
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({
  title,
  avatar,
  colorScheme = 'citrusYellow',
}) => {
  const navigation = useNavigation();
  const {mainColorKey} = useColorScheme(colorScheme);

  return (
    <View
      style={[
        BaseStyle.row,
        BaseStyle.verticalCentered,
        BaseStyle.headerContainer,
        BaseStyle.pad,
        styles.titleContainer,
      ]}>
      {avatar && (
        <View style={BaseStyle.padTinyRight}>
          <Avatar size={AvatarSize.SMALL} uri={avatar} />
        </View>
      )}
      <Text
        fontWeight={'bold'}
        color={mainColorKey}
        style={[BaseStyle.heading3, BaseStyle.textUppercase, BaseStyle.flex]}>
        {title}
      </Text>
      <Icon
        color={mainColorKey}
        name={'close'}
        size={IconSize.HUGE}
        onPress={navigation.goBack}
      />
    </View>
  );
};

export default SecondaryHeader;
