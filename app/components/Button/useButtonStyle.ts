import {Colors, IColors, IColorSchemes} from '../../constants';
import {useMemo} from 'react';
import styles from './styles.ts';
import {ViewStyle} from 'react-native';
import {ButtonSize, ButtonVariant} from './Button.tsx';

const useButtonStyle = (
  variant: ButtonVariant,
  isDisabled: boolean,
  colorScheme: IColorSchemes,
  size: ButtonSize,
) => {
  const curColorScheme = useMemo<IColorSchemes>(() => {
    return isDisabled ? 'gray' : colorScheme;
  }, [isDisabled, colorScheme]);

  const [mainColor, plus1Color, min2Color, min3Color] = useMemo<
    [string, string, string, string]
  >(() => {
    return [
      Colors[curColorScheme],
      Colors[`${curColorScheme}Plus1`],
      Colors[`${curColorScheme}Min2`],
      Colors[`${curColorScheme}Min3`],
    ];
  }, [curColorScheme]);

  const [childrenColor, childrenPressedColor] = useMemo<
    [IColors, IColors]
  >(() => {
    switch (variant) {
      case ButtonVariant.SECONDARY:
        return [curColorScheme, `${curColorScheme}Plus1`];
      case ButtonVariant.TERTIARY:
        return [`${curColorScheme}Plus1`, `${curColorScheme}Plus2`];
      case ButtonVariant.PRIMARY:
      default:
        return ['neutralWhite', 'neutralWhite'];
    }
  }, [curColorScheme, variant]);

  const sizeStyle = useMemo(() => {
    switch (size) {
      case ButtonSize.SMALL:
        return styles.small;
      case ButtonSize.REGULAR:
      default:
        return styles.regular;
    }
  }, [size]);

  const [bgStyle, pressedBgStyle] = useMemo<[ViewStyle, ViewStyle]>(() => {
    switch (variant) {
      case ButtonVariant.SECONDARY:
        return [
          {
            backgroundColor: Colors.neutralWhite,
            borderWidth: 1,
            borderColor: mainColor,
          },
          {
            backgroundColor: Colors.neutralWhite,
            borderWidth: 1,
            borderColor: plus1Color,
          },
        ];
      case ButtonVariant.TERTIARY:
        return [
          {
            backgroundColor: min3Color,
          },
          {
            backgroundColor: min2Color,
          },
        ];
      case ButtonVariant.PRIMARY:
      default:
        return [
          {
            backgroundColor: mainColor,
          },
          {
            backgroundColor: plus1Color,
          },
        ];
    }
  }, [mainColor, min2Color, min3Color, plus1Color, variant]);

  return {
    childrenColor,
    childrenPressedColor,
    bgStyle,
    pressedBgStyle,
    sizeStyle,
  };
};

export default useButtonStyle;
