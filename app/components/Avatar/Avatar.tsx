import React, {memo, useMemo} from 'react';
import {Image, View} from 'react-native';

import {Text} from '../Text';
import {Icon, IconSize} from '../Icon';
import styles from './styles.ts';

export enum AvatarSize {
  REGULAR,
  SMALL,
  LARGE,
}

export interface AvatarProps {
  size?: AvatarSize;
  onEditPress?: () => void;
  placeholder?: string;
  uri?: string;
  isDisabled?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  size = AvatarSize.REGULAR,
  placeholder = 'JD',
  onEditPress,
  uri,
  isDisabled,
}) => {
  const [sizeStyle, iconSize] = useMemo(() => {
    switch (size) {
      case AvatarSize.LARGE:
        return [styles.large, IconSize.LARGE];
      case AvatarSize.SMALL:
        return [styles.small, IconSize.TINY];
      case AvatarSize.REGULAR:
      default:
        return [styles.regular, IconSize.REGULAR];
    }
  }, [size]);

  return (
    <View style={styles.avatarBorder}>
      <View style={[styles.avatar, sizeStyle]}>
        {uri && (
          <Image
            style={[styles.avatar, sizeStyle]}
            source={{uri: `data:image/png;base64,${uri}`}}
          />
        )}
        {!uri && (
          <Text
            color={'neutralWhite'}
            fontWeight={'extraBold'}
            style={styles.avatarAlias}>
            {placeholder}
          </Text>
        )}
        {onEditPress && (
          <Icon
            isDisabled={isDisabled}
            onPress={onEditPress}
            color={isDisabled ? 'gray' : 'victoriaBlue'}
            name={'galleryEdit'}
            size={iconSize}
            wrapperStyle={styles.avatarEdit}
          />
        )}
      </View>
    </View>
  );
};

export default memo(Avatar);
