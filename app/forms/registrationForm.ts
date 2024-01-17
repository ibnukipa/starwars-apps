import {User} from '../stores';

export type RegistrationForm = {
  confirmPassword: string;
} & User;

export type RegistrationFormActions =
  | 'setEmail'
  | 'setFirstName'
  | 'setLastName'
  | 'setPassword'
  | 'setConfirmPassword'
  | 'setJobTitle';

export const registrationFormReducer = (
  state: RegistrationForm,
  action: {
    type: RegistrationFormActions;
    value: string;
  },
): RegistrationForm => {
  switch (action.type) {
    case 'setEmail': {
      return {
        ...state,
        email: action.value,
      };
    }
    case 'setFirstName':
      return {
        ...state,
        firstName: action.value,
      };
    case 'setLastName':
      return {
        ...state,
        lastName: action.value,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.value,
      };
    case 'setConfirmPassword':
      return {
        ...state,
        confirmPassword: action.value,
      };
    case 'setJobTitle':
      return {
        ...state,
        jobTitle: action.value,
      };
  }
};

export const registrationFormInitialValues: RegistrationForm = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};
