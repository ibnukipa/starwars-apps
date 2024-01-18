import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Button, ButtonVariant, Text} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../routes/types.ts';
import {useAuthStore} from '../stores';

const Home: React.FC<StackScreenProps<RootStackParamList, 'Home'>> = () => {
  const [signOutPress, user] = useAuthStore(state => ([state.signOut, state.user]));

  return (
    <SafeAreaView style={[BaseStyle.container, BaseStyle.pad]}>
      <Text
        fontWeight={'medium'}
        color={'citrusYellow'}
        style={BaseStyle.heading3}>
        Welcome, {user?.firstName}...
      </Text>
      <View>
        <Button
          onPress={signOutPress}
          style={BaseStyle.space}
          variant={ButtonVariant.TERTIARY}>
          Sign Out
        </Button>
      </View>
    </SafeAreaView>
  );
};

Home.displayName = 'HomeScreen';

export default Home;
