import React, {forwardRef, useCallback} from 'react';
import {View} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';

import {BaseStyle} from '../../../styles/base.ts';
import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Button, ButtonSize, ButtonVariant} from '../../Button';
import {ItemGroup} from '../../ItemGroup';
import {BottomSheet} from '../../BottomSheet';
import styles from './styles.ts';

export interface GroupModalProps {
  isHasBottomTabBar?: boolean;
}

type GroupModal = BottomSheet;

const GroupModal = forwardRef<GroupModal, GroupModalProps>(
  ({isHasBottomTabBar = true}, ref) => {
    const tabBarHeight = useBottomTabBarHeight();

    const renderItemSeparator = useCallback(() => {
      return <View style={BaseStyle.dividerPlain} />;
    }, []);

    return (
      <BottomSheet
        ref={ref}
        style={BaseStyle.shadowFaceUp}
        index={0}
        isDisabledBackdrop
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        snapPoints={['30%', '75%']}>
        <BottomSheetFlatList
          stickyHeaderIndices={[0]}
          contentContainerStyle={[
            BaseStyle.pad,
            styles.groupContainer,
            {paddingBottom: isHasBottomTabBar ? tabBarHeight : undefined},
          ]}
          ListHeaderComponent={
            <View
              style={[
                BaseStyle.row,
                BaseStyle.verticalCentered,
                BaseStyle.spaceBetween,
                styles.groupHeader,
              ]}>
              <View style={[BaseStyle.row, BaseStyle.verticalCentered]}>
                <Icon
                  style={BaseStyle.padTinyRight}
                  name={'usersGroup'}
                  color={'radiantOrchid'}
                />
                <Text
                  fontWeight={'medium'}
                  color={'radiantOrchid'}
                  style={BaseStyle.heading4}>
                  GROUP
                </Text>
              </View>
              <Button
                colorScheme={'radiantOrchid'}
                variant={ButtonVariant.TERTIARY}
                size={ButtonSize.SMALL}>
                Create group
              </Button>
            </View>
          }
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={() => {
            return <ItemGroup colorScheme={'radiantOrchid'} />;
          }}
          ItemSeparatorComponent={renderItemSeparator}
          ListFooterComponent={
            <SafeAreaView edges={['bottom', 'left', 'right']} />
          }
        />
      </BottomSheet>
    );
  },
);

GroupModal.displayName = 'GroupModal';

export default GroupModal;
