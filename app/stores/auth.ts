import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {User} from './users.ts';
import {useUserStore} from './index.ts';
import {showToast} from '../components';
import {CreateAccountForm, LoginForm} from '../forms';
import {fetchWithTimeout, generateUUID} from '../utils';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isSignInLoading: boolean;
  isSignUpLoading: boolean;
  isSignOutLoading: boolean;
}

interface AuthActions {
  // side effect operations / state manipulation
  signIn: (signInForm: LoginForm) => void;
  signOut: () => void;
  signUp: (signUpForm: CreateAccountForm) => Promise<boolean>;
  updateUser: () => void;
}

const useAuthStore = create(
  immer<AuthState & AuthActions>((setState, getState) => ({
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

      // call API
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
        // TODO: proceed the API response object and set user
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

      // call API
      const response = await fetchWithTimeout(
        'https://localhost:8080/sign-up',
        {
          method: 'post',
        },
      );
      const {add: addUser, fetchStarWarsPeopleByName} = useUserStore.getState();
      if (!response || !response.ok) {
        // in-memory strategy
        const uuid = generateUUID();
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

          // need to initiate in order to avoid nullish check
          groupIds: signUpForm.groupIds,
          invitedGroupIds: signUpForm.invitedGroupIds,
        });
      } else {
        // TODO: proceed the API response
      }

      setState({isSignUpLoading: false});
      // TODO: optionally create notification
      showToast({
        title: 'Success',
        message: `Registered new user with ${signUpForm.email}`,
        colorScheme: 'jadeGreen',
      });
      return true;
    },
    signOut: () => {
      // TODO call API

      // sign-out side effect
      setState(state => {
        state.isLoggedIn = false;
        state.user = null;

        return state;
      });
    },
    updateUser: () => {
      const email = getState().user?.email;
      if (email) {
        const updatedUser = useUserStore.getState().users[email];
        setState(state => {
          state.user = updatedUser;

          return state;
        });
      }
    },
  })),
);

export default useAuthStore;
