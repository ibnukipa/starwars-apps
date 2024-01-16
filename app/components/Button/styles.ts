import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: 100,
  },
  container: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  regular: {
    minHeight: 46,
    paddingHorizontal: 16,
  },
  small: {
    minHeight: 28,
    paddingHorizontal: 16,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default styles;
