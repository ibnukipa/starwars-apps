import React, {memo} from 'react';
import {BaseStyle} from '../../styles/base.ts';
import {View} from 'react-native';
import {Text} from '../Text';
import styles from './styles.ts';
import {IColorSchemes, IIcons} from '../../constants';
import {useColorScheme} from '../../hooks';
import {Icon, IconSize} from '../Icon';

type CardItemProps = {
  value?: string;
  label: string;
  isCard?: boolean;
  colorScheme?: IColorSchemes;
  icon?: IIcons;
};

export interface CardContentProps {
  contents: Array<Array<CardItemProps>>;
}

const CardItem: React.FC<CardItemProps> = ({
  value,
  label,
  colorScheme = 'citrusYellow',
  icon,
  isCard,
}) => {
  const {plus1ColorKey, plus2ColorKey, min1ColorKey, min4Color, min1Color} =
    useColorScheme(colorScheme);

  return (
    <View
      style={[
        styles.card,
        isCard && {borderColor: min1Color},
        !isCard && {backgroundColor: min4Color, borderWidth: 0},
        !isCard && BaseStyle.row,
        !isCard && BaseStyle.verticalCentered,
        !isCard && BaseStyle.spaceBetween,
        !isCard && styles.cardSingle,
      ]}>
      {icon && (
        <Icon
          wrapperStyle={[
            BaseStyle.padTinyRight,
            styles.iconBackground,
            isCard && styles.iconBackgroundCard,
            !isCard && styles.iconBackgroundCardSingle,
          ]}
          size={isCard ? IconSize.GIGANTIC : IconSize.LARGE}
          color={min1ColorKey}
          name={icon}
        />
      )}
      <Text
        color={plus1ColorKey}
        fontWeight={'bold'}
        style={[styles.cardLabel, !isCard && styles.cardSingleLabel]}>
        {label.toUpperCase()}
      </Text>
      <Text
        fontWeight={!isCard ? 'medium' : 'semiBold'}
        color={plus2ColorKey}
        style={[!isCard ? styles.cardValueItem : styles.cardValueString]}>
        {value || '-'}
      </Text>
    </View>
  );
};

const CardContent: React.FC<CardContentProps> = ({contents}) => {
  return (
    <>
      {contents.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={[BaseStyle.row, styles.cardContent]}>
            {row.map((item, index) => {
              return <CardItem key={`${rowIndex}-${index}`} {...item} />;
            })}
          </View>
        );
      })}
    </>
  );
};

export default memo(CardContent);
