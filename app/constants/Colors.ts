import {Leaves} from '../types/base.ts';

const Colors = {
  neutralText: '#222223',
  neutralSecondaryText: '#747474',
  neutralPlaceholderText: '#AAABAD',
  neutralDisabledText: '#AAABAD',
  neutralBorder: '#E3E3E4',
  neutralContainer: '#F3F5F6',
  neutralWhite: '#FFF',

  grayPlus2: '#222223',
  grayPlus1: '#747474',
  gray: '#AAABAD',
  grayMin1: '#C6C7C8',
  grayMin2: '#E3E3E4',
  grayMin3: '#EEEEEF',
  grayMin4: '#F7F7F7',

  citrusYellowPlus2: '#605636',
  citrusYellowPlus1: '#968654',
  citrusYellow: '#D6BF78',
  citrusYellowMin1: '#E8DCB5',
  citrusYellowMin2: '#F3ECD7',
  citrusYellowMin3: '#FBF9F2',
  citrusYellowMin4: '#FBF9F2',

  rustySandPlus2: '#6C4F3B',
  rustySandPlus1: '#A97A5C',
  rustySand: '#F1AF83',
  rustySandMin1: '#F7D3BB',
  rustySandMin2: '#FBE7DA',
  rustySandMin3: '#FDF3EC',
  rustySandMin4: '#FEF7F3',

  victoriaBluePlus2: '#062848',
  victoriaBluePlus1: '#093E6F',
  victoriaBlue: '#0D599F',
  victoriaBlueMin1: '#7AA4CA',
  victoriaBlueMin2: '#B6CDE2',
  victoriaBlueMin3: '#DBE6F1',
  victoriaBlueMin4: '#E7EEF5',

  radiantOrchidPlus2: '#341D2F',
  radiantOrchidPlus1: '#4E2C47',
  radiantOrchid: '#AE629E',
  radiantOrchidMin1: '#D2A9CA',
  radiantOrchidMin2: '#E7D0E2',
  radiantOrchidMin3: '#F3E7F0',
  radiantOrchidMin4: '#F7EFF5',

  crimsonRedPlus2: '#8A1A38',
  crimsonRedPlus1: '#C61F4D',
  crimsonRed: '#EE255C',
  crimsonRedMin1: '#F46E92',
  crimsonRedMin2: '#F9B6C9',
  crimsonRedMin3: '#FCDEE7',
  crimsonRedMin4: '#FDE9EF',

  jadeGreenPlus2: '#236057',
  jadeGreenPlus1: '#2F7F74',
  jadeGreen: '#46BFAE',
  jadeGreenMin1: '#84D4C9',
  jadeGreenMin2: '#C1EAE4',
  jadeGreenMin3: '#DAF2EF',
  jadeGreenMin4: '#EDF9F7',
};

export const ColorSchemes = {
  citrusYellow: 'citrusYellow',
  gray: 'gray',
  rustySand: 'rustySand',
  victoriaBlue: 'victoriaBlue',
  crimsonRed: 'crimsonRed',
  jadeGreen: 'jadeGreen',
  radiantOrchid: 'radiantOrchid',
};

export const ColorSchemeGradients = {
  Plus1: 'Plus1',
  Plus2: 'Plus2',
  Min1: 'Min1',
  Min2: 'Min2',
  Min3: 'Min3',
  Min4: 'Min4',
  '': '',
};

export type IColorSchemes = Leaves<typeof ColorSchemes>;

export type IColorSchemeGradients = Leaves<typeof ColorSchemeGradients>;

export type IColors =
  | Leaves<typeof Colors>
  | `${IColorSchemes}${IColorSchemeGradients}`;

export default Colors;
