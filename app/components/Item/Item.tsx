import React from 'react';
import {View} from 'react-native';

import {BaseStyle} from '../../styles/base.ts';
import {Text} from '../Text';
import styles from './styles.ts';

export interface ItemProps {
  label?: string;
  value?: string;
}

const Item: React.FC<ItemProps> = ({label, value}) => {
  return (
    <View style={[BaseStyle.row, BaseStyle.spaceBetween, styles.itemContainer]}>
      <Text
        style={styles.label}
        fontWeight={'semiBold'}
        color={'neutralPlaceholderText'}>
        {label}
      </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default Item;
