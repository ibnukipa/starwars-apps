import React, {useCallback, useMemo, useRef} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {BaseStyle} from '../styles/base.ts';
import {Colors, IColorSchemes} from '../constants';
import {
  Card,
  CardContent,
  CardContentProps,
  InviteGroupMemberModal,
  MemberModal,
  SecondaryHeader,
} from '../components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../routes/types.ts';
import useGroupStore from '../stores/groups.ts';
import {getAbbreviateNumber} from '../utils';

const COLOR_SCHEME: IColorSchemes = 'radiantOrchid';

const Group: React.FC<StackScreenProps<RootStackParamList, 'Group'>> = ({
  route,
}) => {
  const inviteGroupMemberModalRef = useRef<InviteGroupMemberModal>(null);
  const groupId = useMemo(() => route.params.id, [route.params.id]);

  const group = useGroupStore(state => state.groups[groupId]);

  const invitePress = useCallback(() => {
    inviteGroupMemberModalRef.current?.snapToIndex(0);
  }, []);

  const contents = useMemo<CardContentProps['contents']>(() => {
    return [
      [
        {
          icon: 'bankNote',
          label: 'Cost',
          value: getAbbreviateNumber(group.starWarsProfile?.cost_in_credits),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
        {
          icon: 'spedometerLow',
          label: 'Speed',
          value: getAbbreviateNumber(
            group.starWarsProfile?.max_atmosphering_speed,
          ),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
        {
          icon: 'userId',
          label: 'Passenger',
          value: getAbbreviateNumber(group.starWarsProfile?.passengers),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
      ],
      [
        {
          icon: 'box',
          label: 'Cargo',
          value: getAbbreviateNumber(group.starWarsProfile?.cargo_capacity),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
        {
          icon: 'handStars',
          label: 'Rate',
          value: getAbbreviateNumber(group.starWarsProfile?.hyperdrive_rating),
          isCard: true,
          colorScheme: COLOR_SCHEME,
          isIconFlip: true,
        },
        {
          icon: 'planet',
          label: 'MGLT',
          value: getAbbreviateNumber(group.starWarsProfile?.MGLT),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
      ],
      [
        {
          icon: 'usersGroup',
          label: 'Starship Name',
          value: group.starWarsProfile?.name,
          isCard: false,
          colorScheme: 'rustySand',
        },
      ],
      [
        {
          icon: 'userHands',
          label: 'Crew',
          value: group.starWarsProfile?.crew,
          isCard: false,
          colorScheme: 'rustySand',
        },
      ],
      [
        {
          icon: 'usersGroup',
          label: 'Description',
          value: group.description,
          isCard: false,
          isFloatingLabel: true,
          colorScheme: 'rustySand',
        },
      ],
    ];
  }, [group]);

  return (
    <SafeAreaView edges={['left', 'right']} style={BaseStyle.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <SecondaryHeader
        colorScheme={COLOR_SCHEME}
        avatar={group.avatar}
        title={group.name}
      />
      <ScrollView
        style={BaseStyle.containerSecondary}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[BaseStyle.pad, styles.contentContainer]}>
        <SafeAreaView edges={['bottom']}>
          <Card>
            <CardContent contents={contents} />
          </Card>
          <View style={BaseStyle.dividerPlain} />
        </SafeAreaView>
      </ScrollView>
      <MemberModal invitePress={invitePress} groupId={groupId} />
      <InviteGroupMemberModal
        ref={inviteGroupMemberModalRef}
        groupId={groupId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: '50%',
  },
});

Group.displayName = 'GroupScreen';

export default Group;
