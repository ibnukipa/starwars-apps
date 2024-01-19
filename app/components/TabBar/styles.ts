import {StyleSheet} from 'react-native';
import {Colors, Radii, Spaces} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.neutralWhite,
    borderTopEndRadius: Radii.large,
    borderTopStartRadius: Radii.large,
    borderWidth: 1,
    borderColor: Colors.neutralBorder,
    alignItems: 'center',
    paddingHorizontal: Spaces.regular,
  },
  item: {
    padding: Spaces.regular,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    aspectRatio: 3840 / 2160,
    tintColor: Colors.neutralSecondaryText,
  },
});

export default styles;
