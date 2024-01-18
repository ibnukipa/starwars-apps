import {StyleSheet} from 'react-native';
import {Colors, FontSizes, Radii, Spaces} from '../../constants';

const styles = StyleSheet.create({
  avatarBorder: {
    borderWidth: 2,
    borderColor: Colors.neutralBorder,
    borderRadius: Radii.full,
    padding: Spaces.xTiny,
  },
  avatar: {
    borderRadius: Radii.full,
    backgroundColor: Colors.citrusYellow,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  regular: {
    height: 72,
    width: 72,
  },
  small: {
    height: 52,
    width: 52,
  },
  large: {
    height: 92,
    width: 92,
  },
  avatarAlias: {
    fontSize: FontSizes.large,
  },
  avatarEdit: {
    position: 'absolute',
    top: '-5%',
    right: '-5%',
    backgroundColor: Colors.neutralWhite,
    padding: Spaces.xTiny,
    borderRadius: Radii.regular,
  },
});

export default styles;
