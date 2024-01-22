import React from 'react';
import {View} from 'react-native';

import {BaseStyle} from '../../../styles/base.ts';
import {Text} from '../../Text';

export interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({title}) => {
  return (
    <View
      style={[
        BaseStyle.padTop,
        BaseStyle.padTinyX,
        BaseStyle.padTinyBottom,
        BaseStyle.container,
      ]}>
      <Text fontWeight={'medium'} color={'neutralSecondaryText'}>
        {title.toUpperCase()}
      </Text>
    </View>
  );
};

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
