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
  startWarProfile: People | null;
}

interface UserState {
  users: Record<User['email'], User>;
}

interface UserActions {
  add: (user: User) => void;
  verifyPassword: (
    email: User['email'],
    password: User['password'],
  ) => User | null;
  fetchStarWarsPeopleByName: (name: string) => Promise<People | null>;
}

const useUserStore = create(
  immer<UserState & UserActions>((setState, getState) => ({
    users: userSeed,
    add: user => {
      setState(state => {
        user.email = user.email.toLowerCase();

        // TODO encrypt the password
        state.users[user.email] = user;
        // TODO add lastLocation

        return state;
      });
    },
    verifyPassword: (email, password) => {
      email = email.toLowerCase();

      const user = getState().users[email];

      // TODO decrypt the password
      if (!user || password !== user.password) {
        return null;
      } else {
        // TODO add lastLocation for in-memory
        return user;
      }
    },
    fetchStarWarsPeopleByName: async name => {
      return searchPeopleApi(name);
    },
  })),
);

export default useUserStore;
