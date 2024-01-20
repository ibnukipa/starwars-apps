import {Group} from '../stores/groups.ts';
import {getNameAlias} from '../utils';

export type CreateGroupForm = {
  isValid: boolean;
  isEmpty: boolean;
  invitedMemberEmails: Array<string>;
} & Group;

export type CreateGroupFormActions =
  | 'setName'
  | 'setDescription'
  | 'setAvatar'
  | 'setInvitedMemberEmails';

const validateForm = (_values: CreateGroupForm): boolean => {
  // TODO crate validation for each fields
  return true;
};

export const createGroupFormReducer = (
  state: CreateGroupForm,
  action: {
    type: CreateGroupFormActions;
    value: string;
  },
): CreateGroupForm => {
  const newState: CreateGroupForm = {...state};
  switch (action.type) {
    case 'setName': {
      newState.name = action.value;
      break;
    }
    case 'setDescription':
      newState.description = action.value;
      break;
    case 'setAvatar':
      newState.avatar = action.value;
      break;
    case 'setInvitedMemberEmails':
      const [emailIndex, email] = action.value.split(';');
      if (!email) {
        newState.invitedMemberEmails.splice(Number(emailIndex), 1);
      } else {
        newState.invitedMemberEmails[Number(emailIndex)] = email;
      }
      break;
  }

  newState.isEmpty =
    !newState.name && !newState.description && !newState.avatar;
  newState.isValid = validateForm(newState);
  newState.nameAlias = getNameAlias(newState.name, newState.description);
  return newState;
};

export const createGroupFormInitialValues: CreateGroupForm = {
  isValid: false,
  isEmpty: true,
  invitedMemberEmails: [],

  id: '',
  name: '',
  description: '',
  avatar: undefined,
  nameAlias: undefined,
  starWarsProfile: {},
  ownerId: '',

  memberIds: [],
  invitedMemberIds: [],
};
