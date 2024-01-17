import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Button, ButtonVariant, Text} from '../components';
import {BaseStyle} from '../styles/base.ts';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../routes/types.ts';
import {useAuthStore} from '../stores';

const Home: React.FC<StackScreenProps<RootStackParamList, 'Home'>> = () => {
  const logoutPress = useAuthStore(state => state.logout);

  return (
    <SafeAreaView
      style={[BaseStyle.container, BaseStyle.pad, BaseStyle.centered]}>
      <Text
        fontWeight={'extraBold'}
        color={'citrusYellow'}
        style={BaseStyle.title}>
        StarWars: Home
      </Text>
      <Text color={'neutralSecondaryText'} style={BaseStyle.subTitle}>
        Communication Apps
      </Text>
      <View>
        <Button
          onPress={logoutPress}
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
