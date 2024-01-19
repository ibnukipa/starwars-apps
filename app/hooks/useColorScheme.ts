import {useMemo} from 'react';
import {Colors, IColors, IColorSchemes} from '../constants';

const useColorScheme = (color?: IColorSchemes) => {
  const [
    min4ColorKey,
    min3ColorKey,
    min2ColorKey,
    min1ColorKey,
    mainColorKey,
    plus1ColorKey,
    plus2ColorKey,
  ] = useMemo<
    [IColors, IColors, IColors, IColors, IColors, IColors, IColors] | []
  >(() => {
    if (!color) {
      return [];
    }
    return [
      `${color}Min4`,
      `${color}Min3`,
      `${color}Min2`,
      `${color}Min1`,
      color,
      `${color}Plus1`,
      `${color}Plus2`,
    ];
  }, [color]);

  const [
    min4Color,
    min3Color,
    min2Color,
    min1Color,
    mainColor,
    plus1Color,
    plus2Color,
  ] = useMemo<
    [string, string, string, string, string, string, string] | []
  >(() => {
    if (
      !min4ColorKey ||
      !min3ColorKey ||
      !min2ColorKey ||
      !min1ColorKey ||
      !mainColorKey ||
      !plus1ColorKey ||
      !plus2ColorKey
    ) {
      return [];
    }
    return [
      Colors[min4ColorKey],
      Colors[min3ColorKey],
      Colors[min2ColorKey],
      Colors[min1ColorKey],
      Colors[mainColorKey],
      Colors[plus1ColorKey],
      Colors[plus2ColorKey],
    ];
  }, [
    mainColorKey,
    min1ColorKey,
    min2ColorKey,
    min3ColorKey,
    min4ColorKey,
    plus1ColorKey,
    plus2ColorKey,
  ]);

  return {
    min4Color,
    min3Color,
    min2Color,
    min1Color,
    mainColor,
    plus1Color,
    plus2Color,
    mainColorKey,
    min1ColorKey,
    min2ColorKey,
    min3ColorKey,
    min4ColorKey,
    plus1ColorKey,
    plus2ColorKey,
  };
};

export default useColorScheme;
