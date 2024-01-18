import React, {memo} from 'react';
import {BaseStyle} from '../../styles/base.ts';
import {View} from 'react-native';
import {Text} from '../Text';
import styles from './styles.ts';
import {IColorSchemes} from '../../constants';
import {useColorScheme} from '../../hooks';

export interface CardContentProps {
  contents: Array<
    Array<{value?: string; label: string; isValueString: boolean}>
  >;
  colorScheme?: IColorSchemes;
}

const CardContent: React.FC<CardContentProps> = ({
  contents,
  colorScheme = 'citrusYellow',
}) => {
  const {plus2ColorKey} = useColorScheme(colorScheme);

  return (
    <>
      {contents.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={[BaseStyle.row, styles.cardContent]}>
            {row.map((item, index) => {
              return (
                <View key={`${rowIndex}-${index}`} style={styles.card}>
                  <Text
                    fontWeight={item.isValueString ? 'bold' : 'extraBold'}
                    color={plus2ColorKey}
                    style={
                      item.isValueString
                        ? styles.cardValueString
                        : styles.cardValue
                    }>
                    {item.value || '-'}
                  </Text>
                  <Text style={styles.cardLabel}>
                    {item.label.toUpperCase()}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </>
  );
};

export default memo(CardContent);
