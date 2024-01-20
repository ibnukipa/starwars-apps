import {StyleSheet} from 'react-native';
import {FontSizes, Radii, Spaces} from '../../../constants';

const styles = StyleSheet.create({
  avatarContainer: {
    marginBottom: Spaces.regular,
  },
  avatarPickerButton: {
    borderWidth: 2,
    flex: 1,
    borderRadius: Radii.medium,
    paddingVertical: Spaces.medium,
  },
  avatarPickerButtonContent: {
    alignItems: 'center',
  },
  avatarPickerButtonContentText: {
    fontSize: FontSizes.regular,
  },
});

export default styles;
