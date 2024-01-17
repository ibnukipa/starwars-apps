import {StyleSheet} from 'react-native';
import {Radii, Colors, FontSizes, Heights, Spaces} from '../constants';

export const BaseStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  pad: {
    padding: Spaces.regular,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    marginVertical: Spaces.small,
  },
  title: {
    fontSize: FontSizes.xxLarge,
  },
  subTitle: {
    fontSize: FontSizes.large,
  },
  textCenter: {
    textAlign: 'center',
  },
  // TODO create TextInput component
  textInputContainer: {
    justifyContent: 'center',
    borderRadius: Radii.regular,
    paddingHorizontal: Spaces.regular,
    borderColor: Colors.neutralBorder,
    height: Heights.input,
    borderWidth: 1,
  },
  textInput: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: FontSizes.large,
  },
});
