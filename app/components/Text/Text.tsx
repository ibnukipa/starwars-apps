import React, {memo} from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';

import {IColors} from '../../constants';
import {FontWeight} from './styles.ts';
import useTextStyle from './useTextStyle.ts';

export interface TextProps extends RNTextProps {
  color?: IColors;
  bold?: boolean;
  fontWeight?: FontWeight;
}

const Text: React.FC<TextProps> = ({
  color = 'neutralText',
  style,
  bold,
  fontWeight,
  ...props
}) => {
  const textStyle = useTextStyle(style, color, bold, fontWeight);
  return <RNText {...props} style={textStyle} />;
};

Text.displayName = 'Text';

export default memo(Text);
