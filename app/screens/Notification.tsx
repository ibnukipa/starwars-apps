import React, {useCallback} from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';

import {HomeTabParamList} from '../routes/types.ts';
import {BaseStyle} from '../styles/base.ts';
import {Colors} from '../constants';
import {useAuthStore, useNotificationStore} from '../stores';
import { NotificationItem, TertiaryHeader, Text } from "../components";

const Notification: React.FC<
  BottomTabScreenProps<HomeTabParamList, 'Notification'>
> = () => {
  const currentUser = useAuthStore.getState().user;
  const [notifications] = useNotificationStore(state => [
    currentUser?.id ? state.notifications[currentUser?.id] : [],
  ]);

  const renderItem = useCallback(({item}: any) => {
    return <NotificationItem notification={item} />;
  }, []);

  return (
    <SafeAreaView edges={['left', 'right']} style={BaseStyle.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <SafeAreaView edges={['top', 'bottom']} style={[BaseStyle.container]}>
        <FlatList
          stickyHeaderIndices={[0]}
          style={BaseStyle.container}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          data={notifications}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={[BaseStyle.pad, BaseStyle.listEmptyContainer]}>
              <Text color={'neutralSecondaryText'}>
                No notifications. Please stay tune!
              </Text>
            </View>
          }
          ListHeaderComponent={
            <View style={[BaseStyle.pad, BaseStyle.container]}>
              <TertiaryHeader
                colorScheme={'victoriaBlue'}
                title={'Notifications'}
                icon={'bell'}
              />
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

Notification.displayName = 'NotificationScreen';

export default Notification;
