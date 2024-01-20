import {StyleSheet} from 'react-native';
import {Colors, FontSizes, Heights, Radii, Spaces} from '../../../constants';

const styles = StyleSheet.create({
  textInputContainer: {
    justifyContent: 'center',
    borderRadius: Radii.regular,
    paddingHorizontal: Spaces.regular,
    borderColor: Colors.neutralBorder,
    height: Heights.input,
    borderWidth: 1,
  },
  textInputContainerWithLabel: {
    paddingLeft: Spaces.tiny,
  },
  textInputContainerWithFloatingLabel: {
    marginTop: Spaces.xTiny,
  },
  textInputMultilineContainer: {
    minHeight: Heights.multilineInput,
  },
  textInputContainerDisabled: {
    backgroundColor: Colors.neutralContainer,
  },
  textInputSmallContainer: {
    justifyContent: 'center',
    borderRadius: Radii.regular,
    paddingHorizontal: Spaces.regular,
    borderColor: Colors.neutralBorder,
    height: Heights.smallInput,
    borderWidth: 1,
  },
  textInputMultilineSmallContainer: {
    paddingVertical: Spaces.regular,
    height: undefined,
    minHeight: Heights.multilineSmallInput,
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
  textInputMultilineLabel: {
    marginLeft: Spaces.tiny,
  },
});

export default styles;
