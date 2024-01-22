import {StyleSheet} from 'react-native';
import {Colors, FontSizes, Radii, Spaces} from '../constants';

export const BaseStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutralWhite,
  },
  containerSecondary: {
    flex: 1,
    backgroundColor: Colors.neutralContainer,
  },
  flex: {
    flex: 1,
  },
  pad: {
    padding: Spaces.regular,
  },
  padSmall: {
    padding: Spaces.small,
  },
  padSmallY: {
    paddingVertical: Spaces.small,
  },
  padTiny: {
    padding: Spaces.tiny,
  },
  padTop: {
    paddingTop: Spaces.regular,
  },
  padTinyX: {
    paddingHorizontal: Spaces.tiny,
  },
  padTinyRight: {
    marginRight: Spaces.tiny,
  },
  padTinyTop: {
    paddingTop: Spaces.tiny,
  },
  padTinyBottom: {
    paddingBottom: Spaces.tiny,
  },
  marginTop: {
    marginTop: Spaces.regular,
  },
  marginTopMedium: {
    marginTop: Spaces.medium,
  },
  marginTinyTop: {
    marginTop: Spaces.tiny,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    marginVertical: Spaces.small,
  },
  title: {
    fontSize: FontSizes.xxLarge,
  },
  heading2: {
    fontSize: FontSizes.xLarge,
  },
  heading3: {
    fontSize: FontSizes.large,
  },
  heading4: {
    fontSize: FontSizes.medium,
  },
  subTitle: {
    fontSize: FontSizes.large,
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
  },
  verticalCentered: {
    alignItems: 'center',
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  noPaddingTop: {
    paddingTop: 0,
  },
  noPaddingBottom: {
    paddingBottom: 0,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexStart: {
    alignSelf: 'flex-start',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  flipX: {
    transform: [{scaleX: -1}],
  },
  headerContainer: {
    paddingBottom: Spaces.small,
    borderBottomWidth: 1,
    borderColor: Colors.neutralBorder,
  },
  shadowFaceUp: {
    backgroundColor: Colors.neutralWhite,
    borderTopEndRadius: Radii.large,
    borderTopStartRadius: Radii.large,
    borderColor: Colors.neutralBorder,
    shadowColor: Colors.neutralText,
    shadowOffset: {
      width: 0,
      height: 26,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  // TODO create divider component
  divider: {
    marginVertical: Spaces.tiny,
    height: 1,
    backgroundColor: Colors.citrusYellowPlus1,
    width: '100%',
  },
  dividerPlain: {
    marginVertical: Spaces.tiny,
    height: 1,
    width: '100%',
  },
  dividerPlainTiny: {
    marginVertical: Spaces.xTiny,
    height: 1,
    width: '100%',
  },
  dividerVertical: {
    marginHorizontal: Spaces.tiny,
    backgroundColor: Colors.citrusYellowPlus1,
    height: '100%',
  },
  listEmptyContainer: {
    paddingTop: Spaces.regular,
  },
});
