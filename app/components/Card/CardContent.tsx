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
  isFloatingLabel?: boolean;
  isIconFlip?: boolean;
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
  isFloatingLabel,
  isIconFlip,
}) => {
  const {plus1ColorKey, plus2ColorKey, min1ColorKey, min4Color, min1Color} =
    useColorScheme(colorScheme);

  return (
    <View
      style={[
        styles.card,
        isCard && {borderColor: min1Color},
        !isCard && {backgroundColor: min4Color, borderWidth: 0},
        !isCard && !isFloatingLabel && BaseStyle.row,
        !isCard && BaseStyle.verticalCentered,
        !isCard && BaseStyle.spaceBetween,
        !isCard && styles.cardSingle,
        isFloatingLabel && styles.cardContainerFloatingLabel,
      ]}>
      {icon && !isFloatingLabel && (
        <Icon
          wrapperStyle={[
            BaseStyle.padTinyRight,
            styles.iconBackground,
            isCard && styles.iconBackgroundCard,
            !isCard && styles.iconBackgroundCardSingle,
            isIconFlip && BaseStyle.flipX,
          ]}
          size={isCard ? IconSize.GIGANTIC : IconSize.LARGE}
          color={min1ColorKey}
          name={icon}
        />
      )}
      {!isFloatingLabel && (
        <Text
          color={plus1ColorKey}
          fontWeight={'bold'}
          style={[
            styles.cardLabel,
            !isCard && styles.cardSingleLabel,
            !isCard && isFloatingLabel && styles.cardFloatingLabel,
          ]}>
          {label.toUpperCase()}
        </Text>
      )}
      {isFloatingLabel && (
        <Text
          color={plus1ColorKey}
          fontWeight={'bold'}
          style={[styles.cardLabel, styles.cardFloatingLabel]}>
          {label.toUpperCase()}
        </Text>
      )}
      <Text
        numberOfLines={isFloatingLabel ? undefined : 1}
        fontWeight={!isCard ? 'medium' : 'semiBold'}
        color={plus2ColorKey}
        style={[
          !isCard
            ? isFloatingLabel
              ? styles.cardValueItemFloating
              : styles.cardValueItem
            : styles.cardValueString,
        ]}>
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
