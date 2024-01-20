import {User} from '../stores';
import {getNameAlias} from '../utils';

export type CreateAccountForm = {
  confirmPassword: string;
  isValid: boolean;
  isEmpty: boolean;
} & User;

export type CreateAccountFormActions =
  | 'setEmail'
  | 'setFirstName'
  | 'setLastName'
  | 'setPassword'
  | 'setConfirmPassword'
  | 'setJobTitle'
  | 'setAvatar';

const validateForm = (_values: CreateAccountForm): boolean => {
  // TODO crate validation for each fields
  return true;
};

export const createAccountFormReducer = (
  state: CreateAccountForm,
  action: {
    type: CreateAccountFormActions;
    value: string;
  },
): CreateAccountForm => {
  const newState: CreateAccountForm = {...state};
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

export const createAccountFormInitialValues: CreateAccountForm = {
  isValid: false,
  isEmpty: true,

  id: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  nameAlias: undefined,
  avatar: undefined,
  jobTitle: undefined,
  startWarProfile: {},

  groupIds: [],
  invitedGroupIds: [],
};
