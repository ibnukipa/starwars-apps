import {User} from '../stores';
import {getNameAlias} from '../utils';

export type RegistrationForm = {
  confirmPassword: string;
  isValid: boolean;
  isEmpty: boolean;
} & User;

export type RegistrationFormActions =
  | 'setEmail'
  | 'setFirstName'
  | 'setLastName'
  | 'setPassword'
  | 'setConfirmPassword'
  | 'setJobTitle'
  | 'setAvatar';

const validateForm = (_values: RegistrationForm): boolean => {
  // TODO crate validation for each fields
  return true;
};

export const registrationFormReducer = (
  state: RegistrationForm,
  action: {
    type: RegistrationFormActions;
    value: string;
  },
): RegistrationForm => {
  const newState: RegistrationForm = {...state};
  switch (action.type) {
    case 'setEmail': {
      newState.email = action.value;
      break;
    }
    case 'setFirstName':
      newState.firstName = action.value;
      break;
    case 'setLastName':
      newState.lastName = action.value;
      break;
    case 'setPassword':
      newState.password = action.value;
      break;
    case 'setConfirmPassword':
      newState.confirmPassword = action.value;
      break;
    case 'setJobTitle':
      newState.jobTitle = action.value;
      break;
    case 'setAvatar':
      newState.avatar = action.value;
      break;
  }

  newState.isEmpty =
    !newState.email &&
    !newState.firstName &&
    !newState.lastName &&
    !newState.password &&
    !newState.confirmPassword &&
    !newState.jobTitle &&
    !newState.avatar;
  newState.isValid = validateForm(newState);
  newState.nameAlias = getNameAlias(newState.firstName, newState.lastName);
  return newState;
};

export const registrationFormInitialValues: RegistrationForm = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  isValid: false,
  isEmpty: true,
  nameAlias: undefined,
  avatar: undefined,
};
