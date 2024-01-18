import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

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
}

const useUserStore = create(
  immer<UserState & UserActions>((setState, getState) => ({
    users: {},
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
  })),
);

export default useUserStore;
