import {create} from 'zustand';
import {User} from './users.ts';
import {useUserStore} from './index.ts';
import {immer} from 'zustand/middleware/immer';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  errorMessage: string | null;
  registrationErrorMessage: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => void;
  logout: () => void;
  resetErrorMessage: () => void;
  resetRegistrationErrorMessage: () => void;
}

const useAuthStore = create(
  immer<AuthState & AuthActions>(setState => ({
    isLoggedIn: false,
    user: null,
    errorMessage: null,
    registrationErrorMessage: null,
    login: (email, password) => {
      const user = useUserStore.getState().getByEmail(email);
      // TODO decrypt the password
      if (password === user?.password) {
        setState(state => {
          state.isLoggedIn;
          state.user = user;
          // TODO add lastLocation

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
    resetRegistrationErrorMessage: () => {
      setState(state => {
        state.registrationErrorMessage = null;

        return state;
      });
    },
  })),
);

export default useAuthStore;
