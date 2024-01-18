import React, {memo} from 'react';
import {View} from 'react-native';
import {BaseStyle} from '../../styles/base.ts';
import {Icon, IconProps, IconSize} from '../Icon';
import {Text} from '../Text';
import styles from './styles.ts';
import {IColorSchemes} from '../../constants';
import {useColorScheme} from '../../hooks';

export interface CardProps {
  label: string;
  icon?: IconProps['name'];
  colorScheme?: IColorSchemes;
  children?: React.ReactNode | undefined;
}

const Card: React.FC<CardProps> = ({
  icon = 'camera',
  colorScheme = 'citrusYellow',
  label,
  children,
}) => {
  const {plus2ColorKey, plus1ColorKey} = useColorScheme(colorScheme);
  return (
    <View style={styles.cardContainer}>
      <View style={[BaseStyle.centered, styles.cardHeader]}>
        <Icon
          size={IconSize.HUGE}
          wrapperStyle={styles.cardIcon}
          color={plus2ColorKey}
          name={icon}
        />
        <Text fontWeight={'semiBold'} color={plus1ColorKey}>
          {label.toUpperCase()}
        </Text>
      </View>
      {children}
    </View>
  );
};

export default memo(Card);
