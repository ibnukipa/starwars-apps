import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
  ViewProps,
} from 'react-native';

import {Colors, IColorSchemes} from '../../constants';
import styles from './styles.ts';
import {Text} from '../Text';
import useButtonStyle from './useButtonStyle.ts';

export enum ButtonVariant {
  PRIMARY,
  SECONDARY,
  TERTIARY,
}

export enum ButtonSize {
  REGULAR,
  SMALL,
}

export interface ButtonProps extends ViewProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: IColorSchemes;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: PressableProps['onPress'];
}

const Button: React.FC<ButtonProps> = ({
  colorScheme = 'citrusYellow',
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.REGULAR,
  children,
  style,
  onPress,
  isLoading,
  isDisabled = false,
  ...props
}) => {
  const {
    childrenColor,
    childrenPressedColor,
    bgStyle,
    pressedBgStyle,
    sizeStyle,
    textSizeStyle,
  } = useButtonStyle(variant, isDisabled, colorScheme, size);
  const [isPressing, setIsPressing] = useState(false);

  const onPressIn = useCallback(() => {
    setIsPressing(true);
  }, []);

  const onPressOut = useCallback(() => {
    setIsPressing(false);
  }, []);

  const Children = useMemo(() => {
    if (typeof children === 'string') {
      return (
        <Text
          color={isPressing || isLoading ? childrenPressedColor : childrenColor}
          bold
          style={textSizeStyle}>
          {children.toUpperCase()}
        </Text>
      );
    }

    return children;
  }, [children, childrenColor, childrenPressedColor, isLoading, isPressing]);

  return (
    <View
      style={[
        styles.wrapper,
        bgStyle,
        (isPressing || isLoading) && pressedBgStyle,
        style,
      ]}
      {...props}>
      <Pressable
        disabled={isDisabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.container, sizeStyle]}>
        {isLoading ? (
          <ActivityIndicator
            color={Colors[childrenColor]}
            size={size === ButtonSize.SMALL ? 'small' : undefined}
          />
        ) : (
          Children
        )}
      </Pressable>
    </View>
  );
};

Button.displayName = 'Button';

export default memo(Button);
