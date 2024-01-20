import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {People, searchPeopleApi} from '../apis';
import {userSeed} from './seed';

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
  addGroupIdByEmails: (emails: Array<User['email']>, groupId: string) => void;
  addInvitedGroupId: (email: User['email'], groupId: string) => void;
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

        return state;
      });
    },
    addGroupIdByEmails: (emails, groupId) => {
      const {addGroupId} = getState();
      emails.forEach(email => {
        addGroupId(email, groupId);
      });
    },
    addInvitedGroupId: (email, groupId) => {
      setState(state => {
        state.users[email].invitedGroupIds.push(groupId);

        return state;
      });
    },
    getUserIdsByEmails: emails => {
      return emails.reduce((ids: Array<string>, email) => {
        const curUser = getState().users[email];
        ids.push(curUser.id);
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
