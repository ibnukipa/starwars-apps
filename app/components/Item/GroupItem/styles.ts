import {StyleSheet} from 'react-native';
import {FontSizes, Radii, Spaces} from '../../../constants';

const styles = StyleSheet.create({
  group: {
    padding: Spaces.tiny,
    borderRadius: Radii.medium,
  },
  groupName: {
    fontSize: FontSizes.xMedium,
  },
  groupMember: {
    borderWidth: 0.5,
    borderRadius: Radii.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 25,
    width: 25,
  },
});

export default styles;
