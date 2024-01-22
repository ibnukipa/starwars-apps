import React, {forwardRef, useCallback, useMemo} from 'react';
import {SectionListProps, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetSectionList} from '@gorhom/bottom-sheet';

import {BottomSheet} from '../../BottomSheet';
import useGroupStore from '../../../stores/groups.ts';
import {BaseStyle} from '../../../styles/base.ts';
import {MemberItem} from '../../Item';
import {SectionHeader, TertiaryHeader} from '../../Header';
import styles from './styles.ts';
import {useAuthStore} from '../../../stores';

export interface MemberModalProps {
  groupId: string;
  invitePress: () => void;
}

type MemberModal = BottomSheet;

const MemberModal = forwardRef<MemberModal, MemberModalProps>(
  ({groupId, invitePress}, ref) => {
    const group = useGroupStore(state => state.groups[groupId]);
    const currentUser = useAuthStore(state => state.user);

    const isCurrentUserOwner = useMemo(() => {
      return group.ownerId === currentUser?.id;
    }, [group.ownerId, currentUser?.id]);

    const mergedMemberIds = useMemo<
      SectionListProps<string>['sections']
    >(() => {
      if (group.memberIds.length < 1 && group.invitedMemberIds.length < 1) {
        return [];
      }

      const sections = [];
      if (group.invitedMemberIds.length > 0) {
        sections.push({data: group.invitedMemberIds, key: 'invited member'});
      }
      if (group.memberIds.length > 0) {
        sections.push({data: group.memberIds, key: 'member'});
      }

      return sections;
    }, [group?.memberIds, group?.invitedMemberIds]);

    const renderItemSeparator = useCallback(() => {
      return <View style={BaseStyle.dividerPlain} />;
    }, []);

    const renderItem = useCallback(
      ({item}: {item: string}) => {
        return <MemberItem id={item} groupId={groupId} />;
      },
      [groupId],
    );

    const renderSectionHeader = useCallback(({section}: any) => {
      return <SectionHeader title={section.key} />;
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
        <View
          style={[BaseStyle.pad, styles.container, BaseStyle.noPaddingBottom]}>
          <TertiaryHeader
            colorScheme={'victoriaBlue'}
            title={`Members (${group?.memberIds.length})`}
            icon={'usersGroup'}
            buttonTitle={'New Invite'}
            buttonOnPress={isCurrentUserOwner ? invitePress : undefined}
          />
        </View>
        <BottomSheetSectionList
          contentContainerStyle={[BaseStyle.pad, styles.container]}
          sections={mergedMemberIds}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          ItemSeparatorComponent={renderItemSeparator}
          ListFooterComponent={
            <SafeAreaView edges={['bottom', 'left', 'right']} />
          }
        />
      </BottomSheet>
    );
  },
);

MemberModal.displayName = 'MemberModal';

export default MemberModal;
