import React, {memo} from 'react';
import {View} from 'react-native';
import {BaseStyle} from '../../styles/base.ts';
import {Icon, IconProps, IconSize} from '../Icon';
import {Text} from '../Text';
import styles from './styles.ts';
import {Colors, IColorSchemes} from '../../constants';
import {useColorScheme} from '../../hooks';

export interface CardProps {
  label?: string;
  icon?: IconProps['name'];
  colorScheme?: IColorSchemes;
  children?: React.ReactNode | undefined;
}

const Card: React.FC<CardProps> = ({icon, colorScheme, label, children}) => {
  const {plus2ColorKey, plus1ColorKey, min3Color} = useColorScheme(colorScheme);

  return (
    <View
      style={[
        styles.cardContainer,
        {backgroundColor: colorScheme ? min3Color : Colors.neutralWhite},
      ]}>
      {(label || icon) && (
        <View style={[BaseStyle.centered, styles.cardHeader]}>
          {icon && (
            <Icon
              size={IconSize.HUGE}
              wrapperStyle={styles.cardIcon}
              color={plus2ColorKey}
              name={icon}
            />
          )}
          {label && (
            <Text fontWeight={'semiBold'} color={plus1ColorKey}>
              {label.toUpperCase()}
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
};

export default memo(Card);
