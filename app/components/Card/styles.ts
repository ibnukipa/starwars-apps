import {StyleSheet} from 'react-native';
import {FontSizes, Radii, Spaces} from '../../constants';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: Radii.large,
    padding: Spaces.tiny,
  },
  cardHeader: {
    marginBottom: Spaces.tiny,
  },
  cardIcon: {
    marginRight: Spaces.tiny,
    marginLeft: Spaces.tiny,
  },
  cardContent: {
    marginVertical: Spaces.tiny,
  },
  card: {
    flex: 1,
    marginHorizontal: Spaces.tiny,
    padding: Spaces.small,
    borderRadius: Radii.regular,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardContainerFloatingLabel: {
    overflow: 'visible',
    marginTop: Spaces.regular,
  },
  cardSingle: {
    paddingVertical: Spaces.tiny,
  },
  cardValue: {
    fontSize: FontSizes.xLarge,
  },
  cardValueString: {
    fontSize: FontSizes.large,
  },
  cardValueItem: {
    fontSize: FontSizes.medium,
    flex: 1,
    textAlign: 'right',
  },
  cardValueItemFloating: {
    fontSize: FontSizes.medium,
  },
  cardSingleLabel: {
    marginLeft: Spaces.large,
    alignSelf: 'center',
    marginRight: Spaces.tiny,
  },
  cardLabel: {
    fontSize: FontSizes.xSmall,
  },
  cardFloatingLabel: {
    position: 'absolute',
    top: -Spaces.regular,
    left: Spaces.tiny,
  },
  iconBackground: {
    position: 'absolute',
  },
  iconBackgroundCard: {
    right: '-50%',
  },
  iconBackgroundCardSingle: {
    marginLeft: Spaces.tiny,
    transform: [{scaleX: -1}],
  },
});

export default styles;
