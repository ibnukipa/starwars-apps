import React, {forwardRef, useCallback, useMemo} from 'react';
import {SectionListProps, View} from 'react-native';
import {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {BaseStyle} from '../../../styles/base.ts';
import {Text} from '../../Text';
import {GroupItem} from '../../Item';
import {BottomSheet} from '../../BottomSheet';
import styles from './styles.ts';
import {RootStackParamList} from '../../../routes/types.ts';
import {useAuthStore} from '../../../stores';
import {SectionHeader, TertiaryHeader} from '../../Header';

export interface GroupModalProps {
  isHasBottomTabBar?: boolean;
}

type GroupModal = BottomSheet;

const GroupModal = forwardRef<GroupModal, GroupModalProps>(
  ({isHasBottomTabBar = true}, ref) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const tabBarHeight = useBottomTabBarHeight();

    const [currentUser] = useAuthStore(state => [state.user]);

    const mergedGroupIds = useMemo<SectionListProps<string>['sections']>(() => {
      if (
        currentUser?.invitedGroupIds &&
        currentUser?.invitedGroupIds.length < 1 &&
        currentUser?.groupIds &&
        currentUser?.groupIds.length < 1
      ) {
        return [];
      }
      const sections = [];

      if (
        currentUser?.invitedGroupIds &&
        currentUser?.invitedGroupIds.length > 0
      ) {
        sections.push({
          data: currentUser.invitedGroupIds,
          key: 'invited group',
        });
      }

      if (currentUser?.groupIds && currentUser?.groupIds.length > 0) {
        sections.push({data: currentUser.groupIds, key: 'group'});
      }

      return sections;
    }, [currentUser?.groupIds, currentUser?.invitedGroupIds]);

    const renderItemSeparator = useCallback(() => {
      return <View style={BaseStyle.dividerPlain} />;
    }, []);

    const renderItem = useCallback(({item}: {item: string}) => {
      return <GroupItem id={item} />;
    }, []);

    const renderSectionHeader = useCallback(({section}: any) => {
      return <SectionHeader title={section.key} />;
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
        <View
          style={[
            BaseStyle.pad,
            styles.groupContainer,
            BaseStyle.noPaddingBottom,
          ]}>
          <TertiaryHeader
            colorScheme={'radiantOrchid'}
            title={'Group'}
            icon={'usersGroup'}
            buttonTitle={'Create group'}
            buttonOnPress={navigateToGroupRegistration}
          />
        </View>
        <BottomSheetSectionList
          contentContainerStyle={[
            BaseStyle.pad,
            styles.groupContainer,
            {paddingBottom: isHasBottomTabBar ? tabBarHeight : undefined},
          ]}
          sections={mergedGroupIds}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
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
