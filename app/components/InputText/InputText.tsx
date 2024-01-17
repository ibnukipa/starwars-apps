import React, {memo, useMemo} from 'react';
import {TextInput, View, TextInputProps} from 'react-native';

import {BaseStyle} from '../../styles/base.ts';
import {FontFamilyStyle, Text} from '../Text';
import {Colors} from '../../constants';
import styles from './styles.ts';

export enum InputTextSize {
  SMALL,
  REGULAR,
}

export interface InputTextProps extends TextInputProps {
  size: InputTextSize;
  label?: string;
}

const InputText: React.FC<InputTextProps> = ({
  size = InputTextSize.REGULAR,
  label,
  ...props
}) => {
  const [textInputContainerStyle, textInputStyle] = useMemo(() => {
    switch (size) {
      case InputTextSize.SMALL:
        return [styles.textInputSmallContainer, styles.textInputSmall];
      case InputTextSize.REGULAR:
      default:
        return [styles.textInputContainer, styles.textInput];
    }
  }, [size]);

  return (
    <View
      style={[
        textInputContainerStyle,
        BaseStyle.space,
        BaseStyle.row,
        BaseStyle.spaceBetween,
        BaseStyle.verticalCentered,
      ]}>
      {label && (
        <Text
          fontWeight={'extraBold'}
          color={'neutralSecondaryText'}
          style={[BaseStyle.textUppercase, styles.textInputLabel]}>
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        placeholderTextColor={Colors.neutralPlaceholderText}
        style={[
          textInputStyle,
          BaseStyle.flex,
          !!label && BaseStyle.textRight,
          FontFamilyStyle['500-normal'],
        ]}
      />
    </View>
  );
};

InputText.displayName = 'InputText';

export default memo(InputText);
