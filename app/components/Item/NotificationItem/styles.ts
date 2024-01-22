import {StyleSheet} from 'react-native';
import {Colors, FontSizes, Radii, Spaces} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutralWhite,
  },
  containerHighlighted: {
    backgroundColor: Colors.victoriaBlueMin3,
  },
  iconContainer: {
    padding: Spaces.regular,
    borderRadius: Radii.full,
  },
  title: {
    fontSize: FontSizes.xMedium,
  },
  description: {
    fontSize: FontSizes.medium,
  },
});

export default styles;
