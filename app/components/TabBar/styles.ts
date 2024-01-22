import {StyleSheet} from 'react-native';
import {Colors, Radii, Spaces} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.neutralWhite,
    borderTopEndRadius: Radii.large,
    borderTopStartRadius: Radii.large,
    alignItems: 'center',
    paddingHorizontal: Spaces.regular,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  item: {
    padding: Spaces.regular,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    aspectRatio: 1200 / 572,
    tintColor: Colors.victoriaBlue,
  },
  indicatorContainer: {
    position: 'absolute',
    backgroundColor: Colors.crimsonRed,
    top: '20%',
    right: '40%',
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Radii.full,
    borderColor: Colors.neutralWhite,
    borderWidth: 2,
  },
});

export default styles;
