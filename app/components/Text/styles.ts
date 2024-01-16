import {StyleSheet} from 'react-native';
import {GeneralStyle} from '../../types/base.ts';

export type FontWeight =
  | '100'
  | 'extraLight'
  | '300'
  | 'light'
  | '400'
  | 'regular'
  | '500'
  | 'medium'
  | '600'
  | 'semiBold'
  | '700'
  | 'bold'
  | '800'
  | 'extraBold';

export type FontStyle = 'normal';

export type FontFamily = `${FontWeight}-${FontStyle}`;

export type FontFamilyStyleCreate = {
  [K in FontFamily]: GeneralStyle;
};

export const FontFamilyStyle = StyleSheet.create<FontFamilyStyleCreate>({
  /**
   * @description 100
   */
  '100-normal': {
    fontFamily: 'Dosis-ExtraLight',
  },
  'extraLight-normal': {
    fontFamily: 'Dosis-ExtraLight',
  },

  /**
   * @description 300
   */
  '300-normal': {
    fontFamily: 'Dosis-Light',
  },
  'light-normal': {
    fontFamily: 'Dosis-Light',
  },

  /**
   * @description 400
   */
  '400-normal': {
    fontFamily: 'Dosis-Regular',
  },
  'regular-normal': {
    fontFamily: 'Dosis-Regular',
  },

  /**
   * @description 500
   */
  '500-normal': {
    fontFamily: 'Dosis-Medium',
  },
  'medium-normal': {
    fontFamily: 'Dosis-Medium',
  },

  /**
   * @description 600
   */
  '600-normal': {
    fontFamily: 'Dosis-Semibold',
  },
  'semiBold-normal': {
    fontFamily: 'Dosis-Semibold',
  },

  /**
   * @description 700
   */
  '700-normal': {
    fontFamily: 'Dosis-Bold',
  },
  'bold-normal': {
    fontFamily: 'Dosis-Bold',
  },

  /**
   * @description 800
   */
  '800-normal': {
    fontFamily: 'Dosis-ExtraBold',
  },
  'extraBold-normal': {
    fontFamily: 'Dosis-ExtraBold',
  },
});
