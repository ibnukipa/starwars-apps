import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {User} from './users.ts';
import {useUserStore} from './index.ts';
import {showToast} from '../components';
import {RegistrationForm, LoginForm} from '../forms';
import {fetchWithTimeout, generateUUID} from '../utils';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isSignInLoading: boolean;
  isSignUpLoading: boolean;
  isSignOutLoading: boolean;
}

interface AuthActions {
  signIn: (signInForm: LoginForm) => void;
  signOut: () => void;
  signUp: (signUpForm: RegistrationForm) => Promise<boolean>;
}

const useAuthStore = create(
  immer<AuthState & AuthActions>(setState => ({
    user: null,
    isLoggedIn: false,
    isSignInLoading: false,
    isSignUpLoading: false,
    isSignOutLoading: false,
    signIn: async signInForm => {
      setState({isSignInLoading: true});

      // TODO change this check on form validation
      if (!signInForm.email || !signInForm.password) {
        showToast({
          message: 'Please complete the sign-in form',
          colorScheme: 'citrusYellow',
        });
        setState({isSignInLoading: true});
        return;
      }

      // call non-existent API
      const response = await fetchWithTimeout(
        'https://localhost:8080/sign-in',
        {
          method: 'post',
        },
      );

      let user: User | null = null;

      if (!response || !response.ok) {
        // in-memory strategy
        const {verifyPassword} = useUserStore.getState();
        user = verifyPassword(signInForm.email, signInForm.password);
      } else {
        // TODO: proceed the response object
      }

      // sign-in side effect
      setState({isSignInLoading: false});
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
    signUp: async signUpForm => {
      setState({isSignUpLoading: true});

      // TODO change these checks on form validation
      if (!signUpForm.email || !signUpForm.firstName || !signUpForm.password) {
        showToast({
          message: 'Please complete the sign-up form',
          colorScheme: 'citrusYellow',
        });
        setState({isSignUpLoading: true});
        return false;
      }
      if (signUpForm.password !== signUpForm.confirmPassword) {
        showToast({
          message: 'Password does not match',
          colorScheme: 'crimsonRed',
        });
        setState({isSignUpLoading: true});
        return false;
      }

      // call non-existent API
      const response = await fetchWithTimeout(
        'https://localhost:8080/sign-up',
        {
          method: 'post',
        },
      );
      if (!response || !response.ok) {
        // in-memory strategy
        const uuid = generateUUID();
        const {add: addUser, fetchStarWarsPeopleByName} =
          useUserStore.getState();
        const people = await fetchStarWarsPeopleByName(signUpForm.firstName);
        addUser({
          id: uuid,
          email: signUpForm.email,
          firstName: signUpForm.firstName,
          lastName: signUpForm.lastName,
          password: signUpForm.password,
          nameAlias: signUpForm.nameAlias,
          avatar: signUpForm.avatar,
          startWarProfile: people,
        });
      } else {
        // TODO: proceed the response object
      }

      // sign-up side effect
      setState({isSignUpLoading: false});
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
