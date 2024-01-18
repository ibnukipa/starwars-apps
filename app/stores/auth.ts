import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {User} from './users.ts';
import {useUserStore} from './index.ts';
import {showToast} from '../components';
import {RegistrationForm, LoginForm} from '../forms';
import {generateUUID} from '../utils';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

interface AuthActions {
  signIn: (signInForm: LoginForm) => void;
  signOut: () => void;
  signUp: (signUpForm: RegistrationForm) => boolean;
}

const useAuthStore = create(
  immer<AuthState & AuthActions>(setState => ({
    isLoggedIn: false,
    user: null,
    signIn: signInForm => {
      // TODO change this check on form validation
      if (!signInForm.email || !signInForm.password) {
        showToast({
          message: 'Please complete the sign-in form',
          colorScheme: 'citrusYellow',
        });
        return;
      }

      // TODO call non-existent API
      // user = fetchSignIn()

      // in-memory strategy
      const {verifyPassword} = useUserStore.getState();
      const user = verifyPassword(signInForm.email, signInForm.password);

      // sign-in side effect
      if (!user) {
        showToast({
          message: 'Email or password does not match',
          colorScheme: 'crimsonRed',
        });
      } else {
        setState(state => {
          state.isLoggedIn = true;
          state.user = user;

          return state;
        });
      }
    },
    signUp: signUpForm => {
      // TODO change these checks on form validation
      if (!signUpForm.email || !signUpForm.firstName || !signUpForm.password) {
        showToast({
          message: 'Please complete the sign-up form',
          colorScheme: 'citrusYellow',
        });
        return false;
      }
      if (signUpForm.password !== signUpForm.confirmPassword) {
        showToast({
          message: 'Password does not match',
          colorScheme: 'crimsonRed',
        });
        return false;
      }

      // TODO call non-existent API
      // user = fetchSignUp()

      // in-memory strategy
      const uuid = generateUUID();
      const addUser = useUserStore.getState().add;
      addUser({
        id: uuid,
        email: signUpForm.email,
        firstName: signUpForm.firstName,
        lastName: signUpForm.lastName,
        password: signUpForm.password,
      });

      // sign-up side effect
      showToast({
        title: 'Success',
        message: `Registered new user with ${signUpForm.email}`,
        colorScheme: 'jadeGreen',
      });
      return true;
    },
    signOut: () => {
      // TODO call non-existent API

      // sign-out side effect
      setState(state => {
        state.isLoggedIn = false;
        state.user = null;

        return state;
      });
    },
  })),
);

export default useAuthStore;
