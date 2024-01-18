export type LoginForm = {
  email: string;
  password: string;
  isValid: boolean;
  isEmpty: boolean;
};

export type LoginFormActions = 'setEmail' | 'setPassword';

const validateForm = (_values: LoginForm): boolean => {
  // TODO crate validation for each fields
  return true;
};

export const loginFormReducer = (
  state: LoginForm,
  action: {
    type: LoginFormActions;
    value: string;
  },
): LoginForm => {
  const newState = {...state};
  switch (action.type) {
    case 'setEmail':
      newState.email = action.value;
      break;
    case 'setPassword':
      newState.password = action.value;
      break;
  }

  newState.isEmpty = !newState.email && !newState.password;
  newState.isValid = validateForm(newState);
  return newState;
};

export const loginFormInitialValues: LoginForm = {
  email: '',
  password: '',
  isValid: false,
  isEmpty: true,
};
