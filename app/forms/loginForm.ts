import {registrationFormInitialValues} from './registrationForm.ts';

export type LoginForm = {
  email: string;
  password: string;
};

export type LoginFormActions = 'setEmail' | 'setPassword';

export const loginFormReducer = (
  state: LoginForm,
  action: {
    type: LoginFormActions;
    value: string;
  },
): LoginForm => {
  switch (action.type) {
    case 'setEmail':
      return {
        ...state,
        email: action.value,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.value,
      };
  }
};

export const loginFormInitialValues: LoginForm = {
  email: '',
  password: '',
};
