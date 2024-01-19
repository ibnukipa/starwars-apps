import React from 'react';
import {StatusBar} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';

import {HomeTabParamList} from '../routes/types.ts';
import {BaseStyle} from '../styles/base.ts';
import {Colors} from '../constants';

const Notification: React.FC<
  BottomTabScreenProps<HomeTabParamList, 'Notification'>
> = () => {
  return (
    <SafeAreaView edges={['left', 'right']} style={BaseStyle.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
    </SafeAreaView>
  );
};

Notification.displayName = 'NotificationScreen';

export default Notification;
