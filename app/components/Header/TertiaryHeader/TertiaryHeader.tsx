import React from 'react';
import {BaseStyle} from '../../../styles/base.ts';
import styles from '../../Modal/GroupModal/styles.ts';
import {View} from 'react-native';
import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Button, ButtonSize, ButtonVariant} from '../../Button';
import {IColorSchemes, IIcons} from '../../../constants';
import {useColorScheme} from '../../../hooks';

export interface TertiaryHeaderProps {
  icon: IIcons;
  title: string;
  buttonTitle?: string;
  buttonOnPress?: () => void;
  colorScheme?: IColorSchemes;
}

const TertiaryHeader: React.FC<TertiaryHeaderProps> = ({
  icon,
  title,
  buttonTitle,
  buttonOnPress,
  colorScheme = 'citrusYellow',
}) => {
  const {mainColorKey} = useColorScheme(colorScheme);
  return (
    <View
      style={[
        BaseStyle.row,
        BaseStyle.verticalCentered,
        BaseStyle.spaceBetween,
        styles.groupHeader,
      ]}>
      <View style={[BaseStyle.row, BaseStyle.verticalCentered]}>
        <Icon style={BaseStyle.padTinyRight} name={icon} color={mainColorKey} />
        <View>
          <Text
            fontWeight={'medium'}
            color={mainColorKey}
            style={[BaseStyle.heading4, BaseStyle.textUppercase]}>
            {title}
          </Text>
        </View>
      </View>
      {buttonOnPress && (
        <Button
          onPress={buttonOnPress}
          colorScheme={colorScheme}
          variant={ButtonVariant.TERTIARY}
          size={ButtonSize.XSMALL}>
          {buttonTitle}
        </Button>
      )}
    </View>
  );
};

TertiaryHeader.displayName = 'TertiaryHeader';

export default TertiaryHeader;
