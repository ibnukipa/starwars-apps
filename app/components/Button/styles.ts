import {StyleSheet} from 'react-native';
import {Radii, FontSizes, Heights, Spaces} from '../../constants';

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: Radii.regular,
  },
  container: {
    borderRadius: Radii.regular,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  regular: {
    minHeight: Heights.button,
    paddingHorizontal: Spaces.regular,
  },
  small: {
    minHeight: Heights.smallButton,
    paddingHorizontal: Spaces.regular,
  },
  xSmall: {
    minHeight: Heights.xSmallButton,
    paddingHorizontal: Spaces.regular,
  },
  tiny: {
    minHeight: Heights.tinyButton,
    paddingHorizontal: Spaces.regular,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: FontSizes.large,
  },
  textSmall: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: FontSizes.medium,
  },
  textTiny: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: FontSizes.small,
  },
});

export default styles;
