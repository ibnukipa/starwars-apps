import {User} from './users.ts';
import {Group} from './groups.ts';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {generateUUID} from '../utils';
import useAuthStore from './auth.ts';

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  senderId: string;
  deeplink: string;
}

interface NotificationState {
  // DB
  notifications: Record<User['id'], Array<Notification>>;
  notificationLength: Record<User['id'], number>;
}

interface NotificationActions {
  groupInvitation: (group: Group, userIds: Array<User['id']>) => void;
  markAsRead: (notificationId: string) => void;
  getNotificationLength: () => number | null;
}

const useNotificationStore = create(
  immer<NotificationState & NotificationActions>((setState, getState) => ({
    notifications: {},
    notificationLength: {},
    markAsRead: notificationId => {
      const currentUserId = useAuthStore.getState().user?.id;

      if (currentUserId) {
        setState(state => {
          const index = state.notifications[currentUserId].findIndex(
            notif => notif.id === notificationId,
          );
          state.notifications[currentUserId][index].isRead = true;
          state.notificationLength[currentUserId] -= 1;
          return state;
        });
      }
    },
    groupInvitation: (group, userIds) => {
      const senderId = useAuthStore.getState().user?.id;

      if (senderId) {
        const notification: Notification = {
          id: generateUUID(),
          title: 'Group Invitation',
          description: `You've been invited to join ${group.name}. Please click here join.`,
          time: new Date().toDateString(),
          isRead: false,
          senderId: senderId,
          deeplink: `starwars://group-invitation/${group.id}`,
        };
        setState(state => {
          userIds.forEach(userId => {
            if (state.notifications[userId]) {
              state.notifications[userId].unshift(notification);
            } else {
              state.notifications[userId] = [notification];
            }

            if (state.notificationLength[userId]) {
              // TODO: fix race condition
              state.notificationLength[userId] += 1;
            } else {
              state.notificationLength[userId] = 1;
            }
            return state;
          });
        });
      }
    },
    getNotificationLength: () => {
      const currentUserId = useAuthStore.getState().user?.id;
      if (currentUserId) {
        const allNotifications = getState().notifications[currentUserId];
        if (allNotifications) {
          const unreadNotifications = allNotifications.filter(
            item => !item.isRead,
          );
          return Object.keys(unreadNotifications).length;
        }
      }
      return null;
    },
  })),
);

export default useNotificationStore;
