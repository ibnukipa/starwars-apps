import React, {useMemo} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Avatar,
  AvatarSize,
  Button,
  ButtonSize,
  ButtonVariant,
  Card,
  CardContent,
  CardContentProps,
  Item,
  Text,
} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../routes/types.ts';
import {useAuthStore} from '../stores';
import {Colors, FontSizes, Spaces} from '../constants';

const Home: React.FC<StackScreenProps<RootStackParamList, 'Home'>> = () => {
  const [signOutPress, user] = useAuthStore(state => [
    state.signOut,
    state.user,
  ]);

  const contents = useMemo<CardContentProps['contents']>(() => {
    return [
      [
        {
          label: 'Height',
          value: user?.startWarProfile?.height,
          isValueString: false,
        },
        {
          label: 'Skin',
          value: user?.startWarProfile?.skin_color.split(',')[0],
          isValueString: true,
        },
        {
          label: 'Mass',
          value: user?.startWarProfile?.mass,
          isValueString: false,
        },
      ],
      [
        {
          label: 'Eye',
          value: user?.startWarProfile?.eye_color.split(',')[0],
          isValueString: true,
        },
        {
          label: 'Gender',
          value: user?.startWarProfile?.gender,
          isValueString: true,
        },
        {
          label: 'Hair',
          value: user?.startWarProfile?.hair_color.split(',')[0],
          isValueString: true,
        },
      ],
    ];
  }, [user]);

  return (
    <SafeAreaView edges={['left', 'right']} style={[BaseStyle.container]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[BaseStyle.pad]}>
        <SafeAreaView edges={['top', 'bottom']}>
          <View style={[BaseStyle.centered]}>
            <Avatar
              size={AvatarSize.LARGE}
              uri={user?.avatar}
              placeholder={user?.nameAlias}
            />
            <Text fontWeight={'semiBold'} style={styles.name}>
              {user?.firstName}
              {user?.lastName ? ` ${user?.lastName}` : ''}
            </Text>
          </View>
          <View style={BaseStyle.divider} />
          <View style={BaseStyle.dividerPlain} />
          <Item label={'Email'} value={user?.email} />
          <Item
            label={'Birth Year'}
            value={user?.startWarProfile?.birth_year}
          />
          <Item label={'Job Title'} value={user?.jobTitle || '-'} />
          <View style={BaseStyle.dividerPlain} />
          <Card
            label={'Appearance'}
            icon={'meditation'}
            colorScheme={'rustySand'}>
            <CardContent contents={contents} colorScheme={'rustySand'} />
          </Card>
          <View style={BaseStyle.dividerPlain} />
          <Button
            variant={ButtonVariant.SECONDARY}
            colorScheme={'crimsonRed'}
            size={ButtonSize.SMALL}
            onPress={signOutPress}>
            Logout
          </Button>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: FontSizes.xLarge,
    marginTop: Spaces.tiny,
  },
  jobTitle: {
    fontSize: FontSizes.xMedium,
  },
});

Home.displayName = 'HomeScreen';

export default Home;
