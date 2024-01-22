export type InviteGroupMemberForm = {
  isValid: boolean;
  isEmpty: boolean;
  invitedMemberEmails: Array<string>;
};

export type InviteGroupMemberFormActions = 'setInvitedMemberEmails';

const validateForm = (_values: InviteGroupMemberForm): boolean => {
  // TODO crate validation for each fields
  return true;
};

export const inviteGroupMemberFormReducer = (
  state: InviteGroupMemberForm,
  action: {
    type: InviteGroupMemberFormActions;
    value: string;
  },
): InviteGroupMemberForm => {
  const newState: InviteGroupMemberForm = {...state};
  switch (action.type) {
    case 'setInvitedMemberEmails':
      const [emailIndex, email] = action.value.split(';');
      if (!email) {
        newState.invitedMemberEmails.splice(Number(emailIndex), 1);
      } else {
        newState.invitedMemberEmails[Number(emailIndex)] = email;
      }
      break;
  }

  newState.isEmpty = newState.invitedMemberEmails.length === 0;
  newState.isValid = validateForm(newState);
  return newState;
};

export const inviteGroupMemberFormInitialValues: InviteGroupMemberForm = {
  isValid: true,
  isEmpty: false,
  invitedMemberEmails: ['luke.skywalker@gmail.com'],
};
