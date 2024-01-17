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
}

interface UserState {
  users: Record<User['email'], User>;
}

interface UserActions {
  register: (user: User) => void;
  getByEmail: (email: User['email']) => User | null;
  setLastLocation: (
    email: User['email'],
    lastLocation: User['lastLocation'],
  ) => void;
}

const useUserStore = create(
  immer<UserState & UserActions>((setState, getState) => ({
    users: {},
    register: user => {
      setState(state => {
        // TODO encrypt the password
        state.users[user.email] = user;
        // TODO add lastLocation
        return state;
      });
    },
    getByEmail: email => {
      return getState().users[email];
    },
    setLastLocation: (email, lastLocation) => {
      setState(state => {
        state.users[email].lastLocation = lastLocation;
        return state;
      });
    },
  })),
);

export default useUserStore;
