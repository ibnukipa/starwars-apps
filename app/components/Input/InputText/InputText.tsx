import React, {memo, useMemo} from 'react';
import {TextInput, View, TextInputProps, ViewProps} from 'react-native';

import {BaseStyle} from '../../../styles/base.ts';
import {FontFamilyStyle, Text} from '../../Text';
import {Colors} from '../../../constants';
import styles from './styles.ts';

export enum InputTextSize {
  SMALL,
  REGULAR,
}

export interface InputTextProps extends TextInputProps {
  size?: InputTextSize;
  label?: string;
  isDisabled?: boolean;
  wrapperStyle?: ViewProps['style'];
  isFloatingLabel?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  size = InputTextSize.REGULAR,
  label,
  isDisabled,
  multiline,
  wrapperStyle,
  isFloatingLabel: isFloatingLabelProps,
  ...props
}) => {
  const [textInputContainerStyle, textInputStyle, textInputMultilineStyle] =
    useMemo(() => {
      switch (size) {
        case InputTextSize.SMALL:
          return [
            styles.textInputSmallContainer,
            styles.textInputSmall,
            styles.textInputMultilineSmallContainer,
          ];
        case InputTextSize.REGULAR:
        default:
          return [
            styles.textInputContainer,
            styles.textInput,
            styles.textInputMultilineContainer,
          ];
      }
    }, [size]);

  const isFloatingLabel = useMemo(() => {
    return isFloatingLabelProps || multiline;
  }, [isFloatingLabelProps, multiline]);

  return (
    <>
      {isFloatingLabel && (
        <Text
          fontWeight={'extraBold'}
          color={'neutralSecondaryText'}
          style={[
            BaseStyle.textUppercase,
            styles.textInputLabel,
            styles.textInputMultilineLabel,
          ]}>
          {label}
        </Text>
      )}
      <View
        style={[
          BaseStyle.space,
          BaseStyle.row,
          BaseStyle.spaceBetween,
          !isFloatingLabel && BaseStyle.verticalCentered,
          isDisabled && styles.textInputContainerDisabled,
          label && !isFloatingLabel
            ? styles.textInputContainerWithLabel
            : undefined,
          textInputContainerStyle,
          isFloatingLabel && styles.textInputContainerWithFloatingLabel,
          multiline && textInputMultilineStyle,
          wrapperStyle,
        ]}>
        {label && !isFloatingLabel && (
          <Text
            fontWeight={'extraBold'}
            color={'neutralSecondaryText'}
            style={[BaseStyle.textUppercase, styles.textInputLabel]}>
            {label}
          </Text>
        )}
        <TextInput
          {...props}
          multiline={multiline}
          placeholderTextColor={Colors.neutralPlaceholderText}
          editable={!isDisabled}
          style={[
            textInputStyle,
            BaseStyle.flex,
            !!label && !isFloatingLabel && BaseStyle.textRight,
            FontFamilyStyle['500-normal'],
          ]}
        />
      </View>
    </>
  );
};

InputText.displayName = 'InputText';

export default memo(InputText);
