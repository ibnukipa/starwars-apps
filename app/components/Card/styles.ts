import {StyleSheet} from 'react-native';
import {FontSizes, Radii, Spaces} from '../../constants';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: Radii.regular,
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
  },
  cardSingleLabel: {
    marginLeft: Spaces.large,
  },
  cardLabel: {
    fontSize: FontSizes.xSmall,
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
