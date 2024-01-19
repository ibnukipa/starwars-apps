import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {HomeTabParamList} from '../routes/types.ts';

const Notification: React.FC<
  BottomTabScreenProps<HomeTabParamList, 'Notification'>
> = () => {
  return null;
};

Notification.displayName = 'NotificationScreen';

export default Notification;
