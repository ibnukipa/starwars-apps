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
  flex: {
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
  heading2: {
    fontSize: FontSizes.xLarge,
  },
  heading3: {
    fontSize: FontSizes.large,
  },
  subTitle: {
    fontSize: FontSizes.large,
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
  },
  verticalCentered: {
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  headerContainer: {
    paddingBottom: Spaces.small,
    borderBottomWidth: 1,
    borderColor: Colors.neutralBorder,
  },
  // TODO create divider component
  divider: {
    marginVertical: Spaces.tiny,
    height: 1,
    backgroundColor: Colors.citrusYellowPlus1,
    width: '100%',
  },
});
