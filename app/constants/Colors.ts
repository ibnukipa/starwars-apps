import {Leaves} from '../types/base.ts';

const Colors = {
  neutralText: '#222223',
  neutralSecondaryText: '#747474',
  neutralPlaceholderText: '#AAABAD',
  neutralDisabledText: '#AAABAD',
  neutralBorder: '#E3E3E4',
  neutralDisabledBackground: '#E3E3E4',
  neutralContainer: '#F3F5F6',
  neutralSecondaryBackground: '#F3F5F6',
  neutralWhite: '#FFF',

  grayPlus2: '#222223',
  grayPlus1: '#747474',
  gray: '#AAABAD',
  grayMin1: '#C6C7C8',
  grayMin2: '#E3E3E4',
  grayMin3: '#EEEEEF',

  citrusYellowPlus2: '#605636',
  citrusYellowPlus1: '#968654',
  citrusYellow: '#D6BF78',
  citrusYellowMin1: '#E8DCB5',
  citrusYellowMin2: '#F3ECD7',
  citrusYellowMin3: '#F9F5EB',

  rustySandPlus2: '#6C4F3B',
  rustySandPlus1: '#A97A5C',
  rustySand: '#F1AF83',
  rustySandMin1: '#F7D3BB',
  rustySandMin2: '#FBE7DA',
  rustySandMin3: '#FDF3EC',

  victoriaBluePlus2: '#062848',
  victoriaBluePlus1: '#093E6F',
  victoriaBlue: '#0D599F',
  victoriaBlueMin1: '#7AA4CA',
  victoriaBlueMin2: '#B6CDE2',
  victoriaBlueMin3: '#DBE6F1',
};

export const ColorSchemes = {
  citrusYellow: 'citrusYellow',
  gray: 'gray',
  rustySand: 'rustySand',
  victoriaBlue: 'victoriaBlue',
};

export const ColorSchemeGradients = {
  Plus1: 'Plus1',
  Plus2: 'Plus2',
  Min1: 'Min1',
  Min2: 'Min2',
  Min3: 'Min3',
  '': '',
};

export type IColorSchemes = Leaves<typeof ColorSchemes>;

export type IColorSchemeGradients = Leaves<typeof ColorSchemeGradients>;

export type IColors =
  | Leaves<typeof Colors>
  | `${IColorSchemes}${IColorSchemeGradients}`;

export default Colors;
