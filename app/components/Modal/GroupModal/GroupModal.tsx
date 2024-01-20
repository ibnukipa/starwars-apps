import React, {forwardRef, useCallback} from 'react';
import {View} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {BaseStyle} from '../../../styles/base.ts';
import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Button, ButtonSize, ButtonVariant} from '../../Button';
import {ItemGroup} from '../../ItemGroup';
import {BottomSheet} from '../../BottomSheet';
import styles from './styles.ts';
import {RootStackParamList} from '../../../routes/types.ts';
import useGroupStore, {Group} from '../../../stores/groups.ts';

export interface GroupModalProps {
  isHasBottomTabBar?: boolean;
}

type GroupModal = BottomSheet;

const GroupModal = forwardRef<GroupModal, GroupModalProps>(
  ({isHasBottomTabBar = true}, ref) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const tabBarHeight = useBottomTabBarHeight();

    const [getFlattenGroups] = useGroupStore(state => [state.getFlattenGroups]);

    const renderItemSeparator = useCallback(() => {
      return <View style={BaseStyle.dividerPlain} />;
    }, []);

    const renderItem = useCallback(({item}: {item: Group}) => {
      return <ItemGroup {...item} />;
    }, []);

    const navigateToGroupRegistration = useCallback(() => {
      navigation.navigate('GroupRegistration');
    }, [navigation]);

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
                  style={[BaseStyle.heading4, BaseStyle.textUppercase]}>
                  Group
                </Text>
              </View>
              <Button
                onPress={navigateToGroupRegistration}
                colorScheme={'radiantOrchid'}
                variant={ButtonVariant.TERTIARY}
                size={ButtonSize.XSMALL}>
                Create group
              </Button>
            </View>
          }
          data={getFlattenGroups()}
          renderItem={renderItem}
          ItemSeparatorComponent={renderItemSeparator}
          ListFooterComponent={
            <SafeAreaView edges={['bottom', 'left', 'right']} />
          }
          ListEmptyComponent={
            <View style={BaseStyle.listEmptyContainer}>
              <Text color={'neutralSecondaryText'}>
                No groups. Please create a new one or wait for the others to
                invite you.
              </Text>
            </View>
          }
        />
      </BottomSheet>
    );
  },
);

GroupModal.displayName = 'GroupModal';

export default GroupModal;
