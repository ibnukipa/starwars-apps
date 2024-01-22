import React, {useCallback, useEffect, useRef} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {BaseStyle} from '../../../styles/base.ts';
import {Icon} from '../../Icon';
import {Text} from '../../Text';
import {Notification} from '../../../stores/notifications.ts';
import styles from './styles.ts';
import {useNotificationStore} from '../../../stores';
import {Colors} from '../../../constants';
import extractDeeplink from '../../../utils/extractDeeplink.ts';

export interface NotificationItemProps {
  notification: Notification;
}

const READ_TIMEOUT = 3000;

const NotificationItem: React.FC<NotificationItemProps> = ({notification}) => {
  // TODO: fix typing
  const navigation = useNavigation<any>();
  const [markAsRead] = useNotificationStore(state => [state.markAsRead]);
  const readingTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!notification.isRead) {
      readingTimeout.current = setTimeout(() => {
        markAsRead(notification.id);
      }, READ_TIMEOUT);
    }

    return () => {
      clearTimeout(readingTimeout.current);
    };
  }, [markAsRead, notification.id, notification.isRead]);

  const onPress = useCallback(() => {
    const [routeName, id] = extractDeeplink(notification.deeplink);
    if (routeName) {
      navigation.navigate(routeName, {id});
    }
  }, [navigation, notification.deeplink]);

  return (
    <Pressable
      onPress={onPress}
      style={[
        BaseStyle.row,
        BaseStyle.padSmall,
        BaseStyle.verticalCentered,
        styles.container,
        !notification.isRead && styles.containerHighlighted,
      ]}>
      <View
        style={[
          styles.iconContainer,
          BaseStyle.padTinyRight,
          {
            backgroundColor: notification.isRead
              ? Colors.grayMin3
              : Colors.victoriaBlueMin2,
          },
        ]}>
        <Icon
          color={!notification.isRead ? 'victoriaBlue' : 'gray'}
          name={'mailbox'}
        />
      </View>
      <View style={BaseStyle.flex}>
        <Text
          color={notification.isRead ? 'neutralText' : 'victoriaBluePlus2'}
          style={styles.title}
          fontWeight={'semiBold'}>
          {notification.title}
        </Text>
        <Text
          color={
            notification.isRead ? 'neutralSecondaryText' : 'victoriaBluePlus1'
          }
          style={styles.description}
          fontWeight={'regular'}>
          {notification.description}
        </Text>
      </View>
    </Pressable>
  );
};

export default NotificationItem;
