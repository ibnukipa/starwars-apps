import React, {useCallback} from 'react';
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
  onClosePress?: () => void;
  hasNoPaddingTop?: boolean;
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({
  title,
  avatar,
  colorScheme = 'citrusYellow',
  onClosePress: onClosePressProps,
  hasNoPaddingTop,
}) => {
  const navigation = useNavigation();
  const {mainColorKey} = useColorScheme(colorScheme);

  const onClosePress = useCallback(() => {
    onClosePressProps ? onClosePressProps() : navigation.goBack();
  }, [onClosePressProps, navigation]);

  return (
    <View
      style={[
        BaseStyle.row,
        BaseStyle.verticalCentered,
        BaseStyle.headerContainer,
        BaseStyle.pad,
        styles.titleContainer,
        hasNoPaddingTop && BaseStyle.noPaddingTop,
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
        onPress={onClosePress}
      />
    </View>
  );
};

export default SecondaryHeader;
