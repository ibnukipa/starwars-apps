import {StyleSheet} from 'react-native';
import {Colors, FontSizes, Heights, Radii, Spaces} from '../../constants';

const styles = StyleSheet.create({
  textInputContainer: {
    justifyContent: 'center',
    borderRadius: Radii.regular,
    paddingHorizontal: Spaces.regular,
    borderColor: Colors.neutralBorder,
    height: Heights.input,
    borderWidth: 1,
  },
  textInputSmallContainer: {
    justifyContent: 'center',
    borderRadius: Radii.regular,
    paddingHorizontal: Spaces.regular,
    borderColor: Colors.neutralBorder,
    height: Heights.smallInput,
    borderWidth: 1,
  },
  textInput: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: FontSizes.large,
  },
  textInputSmall: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: FontSizes.medium,
  },
  textInputLabel: {
    fontSize: FontSizes.regular,
  },
});

export default styles;
