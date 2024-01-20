import React, {forwardRef} from 'react';
import {View} from 'react-native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';

import {BottomSheet} from '../../BottomSheet';
import {BaseStyle} from '../../../styles/base.ts';
import {Button, ButtonVariant} from '../../Button';
import {Icon, IconSize} from '../../Icon';
import {Text} from '../../Text';
import styles from './styles.ts';
import {IColorSchemes} from '../../../constants';
import {useColorScheme} from '../../../hooks';

export interface AvatarModalProps {
  colorScheme?: IColorSchemes;
  cameraPress: () => void;
  libraryPress: () => void;
}

type AvatarModal = BottomSheet;

const AvatarModal = forwardRef<AvatarModal, AvatarModalProps>(
  ({cameraPress, libraryPress, colorScheme = 'citrusYellow'}, ref) => {
    const {plus1ColorKey, plus1Color} = useColorScheme(colorScheme);
    return (
      <BottomSheet ref={ref}>
        <BottomSheetView>
          <SafeAreaView
            style={BaseStyle.pad}
            edges={['bottom', 'left', 'right']}>
            <View style={[BaseStyle.row, BaseStyle.spaceBetween]}>
              <Button
                colorScheme={colorScheme}
                onPress={cameraPress}
                style={[styles.avatarPickerButton, {borderColor: plus1Color}]}
                variant={ButtonVariant.TERTIARY}>
                <View style={styles.avatarPickerButtonContent}>
                  <Icon
                    isDisabled
                    size={IconSize.GIGANTIC}
                    color={plus1ColorKey}
                    name={'camera'}
                  />
                  <Text
                    color={plus1ColorKey}
                    fontWeight={'semiBold'}
                    style={styles.avatarPickerButtonContentText}>
                    Take from Camera
                  </Text>
                </View>
              </Button>
              <View style={BaseStyle.dividerVertical} />
              <Button
                colorScheme={colorScheme}
                onPress={libraryPress}
                style={[styles.avatarPickerButton, {borderColor: plus1Color}]}
                variant={ButtonVariant.TERTIARY}>
                <View style={styles.avatarPickerButtonContent}>
                  <Icon
                    isDisabled
                    size={IconSize.GIGANTIC}
                    color={plus1ColorKey}
                    name={'gallery'}
                  />
                  <Text
                    color={plus1ColorKey}
                    fontWeight={'semiBold'}
                    style={styles.avatarPickerButtonContentText}>
                    Pick from Gallery
                  </Text>
                </View>
              </Button>
            </View>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

AvatarModal.displayName = 'AvatarModal';

export default AvatarModal;
