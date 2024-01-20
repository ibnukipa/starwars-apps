import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {BaseStyle} from '../../../styles/base.ts';
import {Text} from '../../Text';
import {Icon, IconSize} from '../../Icon';
import styles from './styles.ts';
import {IColorSchemes} from '../../../constants';
import {useColorScheme} from '../../../hooks';

export interface SecondaryHeaderProps {
  title: string;
  colorScheme?: IColorSchemes;
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({
  title,
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
      <Text
        fontWeight={'bold'}
        color={mainColorKey}
        style={[BaseStyle.heading3, BaseStyle.textUppercase]}>
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
