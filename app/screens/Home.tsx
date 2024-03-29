import React, {useMemo} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {
  Avatar,
  AvatarSize,
  Button,
  ButtonSize,
  ButtonVariant,
  Card,
  CardContent,
  CardContentProps,
  GroupModal,
  Text,
} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {HomeTabParamList} from '../routes/types.ts';
import {useAuthStore} from '../stores';
import {Colors, FontSizes} from '../constants';
import {getAbbreviateNumber} from '../utils';

const Home: React.FC<BottomTabScreenProps<HomeTabParamList, 'Home'>> = () => {
  const [signOutPress, user] = useAuthStore(state => [
    state.signOut,
    state.user,
  ]);

  const contents = useMemo<CardContentProps['contents']>(() => {
    return [
      [
        {
          icon: 'arrowUpRound',
          label: 'Height',
          value: user?.startWarProfile?.height,
          isCard: true,
          colorScheme: 'citrusYellow',
        },
        {
          icon: 'masks',
          label: 'Skin',
          value: user?.startWarProfile?.skin_color?.split(',')[0],
          isCard: true,
          colorScheme: 'citrusYellow',
        },
        {
          icon: 'dumbbell',
          label: 'Mass',
          value: getAbbreviateNumber(user?.startWarProfile?.mass),
          isCard: true,
          colorScheme: 'citrusYellow',
        },
      ],
      [
        {
          icon: 'eye',
          label: 'Eye',
          value: user?.startWarProfile?.eye_color?.split(',')[0],
          isCard: true,
          colorScheme: 'citrusYellow',
        },
        {
          icon: 'accessibility',
          label: 'Gender',
          value: user?.startWarProfile?.gender,
          isCard: true,
          colorScheme: 'citrusYellow',
        },
        {
          icon: 'blackHole',
          label: 'Hair',
          value: user?.startWarProfile?.hair_color?.split(',')[0],
          isCard: true,
          colorScheme: 'citrusYellow',
        },
      ],
      [
        {
          icon: 'mailbox',
          label: 'Email',
          value: user?.email,
          isCard: false,
        },
      ],
      [
        {
          icon: 'medal',
          label: 'Birth Year',
          value: user?.startWarProfile?.birth_year,
          isCard: false,
        },
      ],
      [
        {
          icon: 'suitcase',
          label: 'Job Title',
          value: user?.jobTitle,
          isCard: false,
        },
      ],
    ];
  }, [user]);

  return (
    <SafeAreaView edges={['left', 'right']} style={[BaseStyle.container]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralContainer}
      />
      <SafeAreaView
        edges={['top', 'bottom']}
        style={[BaseStyle.containerSecondary]}>
        <View
          style={[
            BaseStyle.pad,
            BaseStyle.row,
            BaseStyle.verticalCentered,
            BaseStyle.spaceBetween,
          ]}>
          <View style={BaseStyle.flex}>
            <Text color={'neutralSecondaryText'} style={styles.greeting}>
              Hello, welcome back
            </Text>
            <Text
              fontWeight={'bold'}
              color={'citrusYellowPlus1'}
              style={styles.name}>
              {user?.firstName}
              {user?.lastName ? ` ${user?.lastName}` : ''}
            </Text>
          </View>
          <Avatar
            size={AvatarSize.SMALL}
            uri={user?.avatar}
            placeholder={user?.nameAlias}
          />
        </View>
        <ScrollView
          style={BaseStyle.containerSecondary}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[BaseStyle.pad, styles.contentContainer]}>
          <Card>
            <CardContent contents={contents} />
          </Card>
          <View style={BaseStyle.dividerPlain} />
          <Card>
            <View
              style={[
                BaseStyle.spaceBetween,
                BaseStyle.padTinyX,
                BaseStyle.row,
                BaseStyle.verticalCentered,
              ]}>
              <Text>v1.0.0</Text>
              <Button
                variant={ButtonVariant.PRIMARY}
                colorScheme={'crimsonRed'}
                size={ButtonSize.TINY}
                onPress={signOutPress}>
                Logout
              </Button>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
      <GroupModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: '60%',
  },
  greeting: {
    fontSize: FontSizes.medium,
  },
  name: {
    fontSize: FontSizes.large,
  },
});

Home.displayName = 'HomeScreen';

export default Home;
