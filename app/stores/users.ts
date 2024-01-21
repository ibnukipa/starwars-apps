import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {People, searchPeopleApi} from '../apis';
import {userSeed} from './seed';
import {removeValue} from '../utils';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  jobTitle?: string;
  lastLocation?: string;
  nameAlias: string | undefined;
  avatar: string | undefined;
  startWarProfile?: People | null;

  // relations
  groupIds: Array<string>;
  invitedGroupIds: Array<string>;
}

interface UserState {
  users: Record<User['email'], User>;
}

interface UserActions {
  // DB Operations
  add: (user: User) => void;
  addGroupId: (email: User['email'], groupId: string) => void;
  removeGroupId: (email: User['email'], groupId: string) => void;
  addGroupIdByEmails: (emails: Array<User['email']>, groupId: string) => void;
  addInvitedGroupId: (email: User['email'], groupId: string) => void;
  addInvitedGroupIdByEmails: (
    emails: Array<User['email']>,
    groupId: string,
  ) => void;
  getUserIdsByEmails: (emails: Array<User['email']>) => Array<User['id']>;

  // side effect operations / state manipulation
  verifyPassword: (
    email: User['email'],
    password: User['password'],
  ) => User | null;

  // API calls
  fetchStarWarsPeopleByName: (name: string) => Promise<People | null>;
}

const useUserStore = create(
  immer<UserState & UserActions>((setState, getState) => ({
    users: userSeed,

    add: user => {
      setState(state => {
        user.email = user.email.toLowerCase();
        // TODO encrypt the password
        // TODO add lastLocation

        state.users[user.email] = user;

        return state;
      });
    },
    addGroupId: (email, groupId) => {
      setState(state => {
        state.users[email].groupIds.push(groupId);

        // remove invited groupId
        const invitedGroupIds = state.users[email].invitedGroupIds;
        state.users[email].invitedGroupIds = removeValue(
          invitedGroupIds,
          groupId,
        );

        return state;
      });
    },
    removeGroupId: (email, groupId) => {
      setState(state => {
        const groupIds = state.users[email].groupIds;
        state.users[email].groupIds = removeValue(groupIds, groupId);

        return state;
      });
    },
    addGroupIdByEmails: (emails, groupId) => {
      const {addGroupId} = getState();
      emails.forEach(email => {
        addGroupId(email.toLowerCase(), groupId);
      });
    },
    addInvitedGroupId: (email, groupId) => {
      setState(state => {
        state.users[email].invitedGroupIds.push(groupId);

        return state;
      });
    },
    addInvitedGroupIdByEmails: (emails, groupId) => {
      const {addInvitedGroupId} = getState();
      emails.forEach(email => {
        addInvitedGroupId(email.toLowerCase(), groupId);
      });
    },
    getUserIdsByEmails: emails => {
      return emails.reduce((ids: Array<string>, email) => {
        const curUser = getState().users[email.toLowerCase()];
        if (curUser) {
          ids.push(curUser.id);
        }
        return ids;
      }, []);
    },

    verifyPassword: (email, password) => {
      email = email.toLowerCase();

      // TODO call API
      // in-memory strategy
      const user = getState().users[email];

      // TODO decrypt the password
      if (!user || password !== user.password) {
        return null;
      } else {
        // TODO add lastLocation for in-memory
        return user;
      }
    },

    fetchStarWarsPeopleByName: name => {
      return searchPeopleApi(name);
    },
  })),
);

export default useUserStore;
