import {StyleSheet} from 'react-native';
import {Colors, FontSizes, Radii, Spaces} from '../../constants';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.rustySandMin3,
    borderRadius: Radii.medium,
    borderWidth: 1,
    borderColor: Colors.neutralBorder,
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
    backgroundColor: Colors.rustySandMin2,
    marginHorizontal: Spaces.tiny,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spaces.small,
    borderRadius: Radii.regular,
    borderWidth: 1,
    borderColor: Colors.rustySandPlus1,
  },
  cardValue: {
    fontSize: FontSizes.xLarge,
  },
  cardValueString: {
    fontSize: FontSizes.large,
  },
  cardLabel: {
    fontSize: FontSizes.small,
  },
});

export default styles;
