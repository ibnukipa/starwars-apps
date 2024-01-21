import React, {useMemo} from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {BaseStyle} from '../styles/base.ts';
import {Colors, IColorSchemes, Spaces} from '../constants';
import {
  Card,
  CardContent,
  CardContentProps,
  KeyboardAvoidingView,
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
  const groupId = useMemo(() => route.params.id, [route.params.id]);

  const group = useGroupStore(state => state.groups[groupId]);

  const contents = useMemo<CardContentProps['contents']>(() => {
    return [
      [
        {
          icon: 'usersGroup',
          label: 'Cost',
          value: getAbbreviateNumber(group.starWarsProfile?.cost_in_credits),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
        {
          icon: 'usersGroup',
          label: 'Speed',
          value: getAbbreviateNumber(
            group.starWarsProfile?.max_atmosphering_speed,
          ),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
        {
          icon: 'usersGroup',
          label: 'Passenger',
          value: getAbbreviateNumber(group.starWarsProfile?.passengers),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
      ],
      [
        {
          icon: 'usersGroup',
          label: 'Cargo',
          value: getAbbreviateNumber(group.starWarsProfile?.cargo_capacity),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
        {
          icon: 'usersGroup',
          label: 'Rate',
          value: getAbbreviateNumber(group.starWarsProfile?.hyperdrive_rating),
          isCard: true,
          colorScheme: COLOR_SCHEME,
        },
        {
          icon: 'usersGroup',
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
          icon: 'usersGroup',
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
      <KeyboardAvoidingView style={BaseStyle.flex}>
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
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: Spaces.presentationModal,
    flex: 1,
  },
});

Group.displayName = 'GroupScreen';

export default Group;
