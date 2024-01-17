import {create} from 'zustand';
import {User} from './users.ts';
import {useUserStore} from './index.ts';
import {immer} from 'zustand/middleware/immer';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  errorMessage: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => void;
  logout: () => void;
  resetErrorMessage: () => void;
}

const useAuthStore = create(
  immer<AuthState & AuthActions>(setState => ({
    isLoggedIn: false,
    errorMessage: null,
    user: null,
    login: (email, password) => {
      const user = useUserStore.getState().getByEmail(email);
      // TODO decrypt the password
      if (password === user?.password) {
        setState(state => {
          state.isLoggedIn;
          state.user = user;

          return state;
        });
      } else {
        setState(state => {
          state.errorMessage = user
            ? 'Password is not match'
            : 'Email is not registered yet';
          return state;
        });
      }
    },
    logout: () => {
      setState(state => {
        state.isLoggedIn = false;
        state.user = null;

        return state;
      });
    },
    resetErrorMessage: () => {
      setState(state => {
        state.errorMessage = null;

        return state;
      });
    },
  })),
);

export default useAuthStore;
