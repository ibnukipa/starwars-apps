import {searchStarshipApi, Starship} from '../apis';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {CreateGroupForm, InviteGroupMemberForm} from '../forms';
import {showToast} from '../components';
import {fetchWithTimeout, generateUUID, removeValue} from '../utils';
import useAuthStore from './auth.ts';
import useUserStore, {User} from './users.ts';
import useNotificationStore from './notifications.ts';

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string | undefined;
  nameAlias: string | undefined;
  starWarsProfile?: Starship | null;
  ownerId: string;

  // relations
  memberIds: Array<string>;
  invitedMemberIds: Array<string>;
}

interface GroupState {
  // DB
  groups: Record<Group['id'], Group>;

  // side effect state
  isCreating: boolean;
  isAccepting: boolean;
  isRemovingOrLeavingMember: boolean;
  isInvitingMember: boolean;
  isCancellingMember: boolean;
}

interface GroupActions {
  // DB Operations
  add: (group: Group) => void;
  addMemberId: (groupId: string, userId: string) => void;
  removeMemberId: (groupId: string, userId: string) => void;
  addInvitedMemberIds: (groupId: string, userIds: Array<string>) => void;
  removeInvitedMemberId: (groupId: string, userId: string) => void;
  getFlattenGroups: () => Array<Group>;

  // side effect operations / state manipulation
  create: (groupForm: CreateGroupForm) => Promise<boolean>;
  accept: (groupId: string) => Promise<boolean>;
  reject: () => void;
  removeOrLeaveMember: (groupId: string, userId?: string) => Promise<boolean>;
  inviteMember: (
    groupId: string,
    inviteGroupMemberForm: InviteGroupMemberForm,
  ) => Promise<boolean>;
  cancelMember: (groupId: string, userId?: string) => Promise<boolean>;
  getIsOwner: (group: Group, user?: User) => boolean;
  getIsInvited: (group: Group, user?: User) => boolean;
  getIsMember: (group: Group, user?: User) => boolean;

  // API calls
  fetchStarWarStarshipById: (id: string) => Promise<Starship | null>;
}

const useGroupStore = create(
  immer<GroupState & GroupActions>((setState, getState) => ({
    groups: {},

    isCreating: false,
    isAccepting: false,
    isRemovingOrLeavingMember: false,
    isInvitingMember: false,
    isCancellingMember: false,

    add: group => {
      setState(state => {
        state.groups[group.id] = group;

        return state;
      });
    },
    addMemberId: (groupId, userId) => {
      setState(state => {
        if (state.groups[groupId]) {
          state.groups[groupId].memberIds.push(userId);

          // remove invited memberId
          const invitedMemberIds = state.groups[groupId].invitedMemberIds;
          state.groups[groupId].invitedMemberIds = removeValue(
            invitedMemberIds,
            userId,
          );
        }

        return state;
      });
    },
    removeMemberId: (groupId, userId) => {
      setState(state => {
        if (state.groups[groupId]) {
          const memberIds = state.groups[groupId].memberIds;
          state.groups[groupId].memberIds = removeValue(memberIds, userId);
        }

        return state;
      });
    },
    addInvitedMemberIds: (groupId, userIds) => {
      setState(state => {
        userIds.forEach(userId => {
          if (state.groups[groupId]) {
            state.groups[groupId].invitedMemberIds.push(userId);
          }
        });

        return state;
      });
    },
    removeInvitedMemberId: (groupId, userId) => {
      setState(state => {
        if (state.groups[groupId]) {
          const invitedMemberIds = state.groups[groupId].invitedMemberIds;
          state.groups[groupId].invitedMemberIds = removeValue(
            invitedMemberIds,
            userId,
          );
        }

        return state;
      });
    },
    getFlattenGroups: () => Object.values(getState().groups),

    create: async groupForm => {
      setState({isCreating: true});

      // TODO change these checks on form validation
      if (!groupForm.name || !groupForm.description) {
        showToast({
          message: 'Please complete the sign-up form',
          colorScheme: 'citrusYellow',
        });
        setState({isCreating: false});
        return false;
      }

      // call API
      const response = await fetchWithTimeout(
        'https://localhost:8080/create-group',
        {
          method: 'post',
        },
      );

      const {user: owner, updateUser} = useAuthStore.getState();
      if (!owner) {
        showToast({
          message: 'Please sign-in first',
          colorScheme: 'crimsonRed',
        });
        return false;
      }

      const {
        getUserIdsByEmails,
        addGroupIdByEmails,
        addInvitedGroupIdByEmails,
      } = useUserStore.getState();
      const {groupInvitation} = useNotificationStore.getState();
      const {add: addGroup} = getState();
      let newGroup: Group | null = null;

      if (!response || !response.ok) {
        // in-memory strategy
        const starship = await searchStarshipApi(groupForm.name);
        const invitedMemberIds = getUserIdsByEmails(
          groupForm.invitedMemberEmails,
        );
        const uuid = generateUUID();
        newGroup = {
          id: uuid,
          name: groupForm.name,
          description: groupForm.description,
          avatar: groupForm.avatar,
          nameAlias: groupForm.nameAlias,
          starWarsProfile: starship || groupForm.starWarsProfile,
          ownerId: owner.id,
          memberIds: [owner.id],
          invitedMemberIds: invitedMemberIds,
        };

        if (newGroup) {
          addGroup(newGroup);

          // update user owner
          addGroupIdByEmails([owner.email], newGroup.id);

          // update users
          addInvitedGroupIdByEmails(groupForm.invitedMemberEmails, newGroup.id);

          // notifications
          groupInvitation(newGroup, invitedMemberIds);
        }
      } else {
        // TODO: proceed the API response
      }

      setState({isCreating: false});
      updateUser();
      // TODO: optionally create notification to owner
      showToast({
        title: 'Success',
        message: `Created new group ${groupForm.name}`,
        colorScheme: 'jadeGreen',
      });
      return true;
    },
    accept: async (groupId: string) => {
      setState({isAccepting: true});

      const group = getState().groups[groupId];
      if (!group) {
        showToast({
          message: 'The group does not exist anymore',
          colorScheme: 'crimsonRed',
        });
        setState({isAccepting: false});
        return false;
      }

      // call API
      const response = await fetchWithTimeout(
        'https://localhost:8080/accept-group',
        {
          method: 'post',
        },
      );

      const {updateUser} = useAuthStore.getState();
      if (!response || !response.ok) {
        // in-memory strategy
        const {addMemberId} = getState();
        const {addGroupId} = useUserStore.getState();
        const {user: currentUser} = useAuthStore.getState();
        const userId = currentUser?.id;

        if (userId && groupId) {
          addMemberId(groupId, userId);
          addGroupId(currentUser.email, groupId);
          // TODO create notification to group owner
        }
      } else {
        // TODO: proceed the API response object
      }

      setState({isAccepting: false});
      updateUser();
      // TODO: optionally create notification to member
      showToast({
        title: 'Success',
        message: `Joined new group ${group.name}`,
        colorScheme: 'jadeGreen',
      });
      return true;
    },
    // TODO: add reject functionality
    reject: () => {},
    removeOrLeaveMember: async (groupId: string, userEmail?: string) => {
      setState({isRemovingOrLeavingMember: true});
      const group = getState().groups[groupId];
      if (!group) {
        showToast({
          message: 'The group does not exist anymore',
          colorScheme: 'crimsonRed',
        });
        setState({isRemovingOrLeavingMember: false});
        return false;
      }

      // call API
      const response = await fetchWithTimeout(
        'https://localhost:8080/remove-or-leave-group',
        {
          method: 'post',
        },
      );

      const {user: currentUser, updateUser} = useAuthStore.getState();
      let user: User | null = null;

      if (!response || !response.ok) {
        // in-memory strategy
        const {users, removeGroupId} = useUserStore.getState();
        const {removeMemberId} = getState();
        user = userEmail ? users[userEmail] : currentUser;

        if (user) {
          removeMemberId(groupId, user.id);
          removeGroupId(user.email, groupId);
        }
      } else {
        // TODO: proceed the API response object
      }

      setState({isRemovingOrLeavingMember: false});
      updateUser();
      // TODO: optionally create notification to member
      showToast({
        title: 'Success',
        message: `Removed ${user?.firstName} from group ${group.name}`,
        colorScheme: 'jadeGreen',
      });
      return true;
    },
    inviteMember: async (groupId, inviteGroupMemberForm) => {
      setState({isInvitingMember: true});

      // call API
      const response = await fetchWithTimeout(
        'https://localhost:8080/remove-or-leave-group',
        {
          method: 'post',
        },
      );

      let invitedMember = [];
      if (!response || !response.ok) {
        // in-memory strategy
        const {addInvitedMemberIds, groups} = getState();
        const {addInvitedGroupIdByEmails, getUserIdsByEmails} =
          useUserStore.getState();
        const {groupInvitation} = useNotificationStore.getState();
        if (inviteGroupMemberForm) {
          const invitedMemberIds = getUserIdsByEmails(
            inviteGroupMemberForm.invitedMemberEmails,
          );

          addInvitedMemberIds(groupId, invitedMemberIds);

          // update users relation
          addInvitedGroupIdByEmails(
            inviteGroupMemberForm.invitedMemberEmails,
            groupId,
          );

          // notifications
          groupInvitation(groups[groupId], invitedMemberIds);

          invitedMember = invitedMemberIds;
          // TODO: create in app-notification to invitee
        }
      } else {
        // TODO: proceed the API response object
      }

      const {updateUser} = useAuthStore.getState();

      setState({isInvitingMember: false});
      updateUser();
      showToast({
        title: 'Success',
        message: `Invited new member in total ${invitedMember.length}`,
        colorScheme: 'jadeGreen',
      });
      return true;
    },
    cancelMember: async (groupId: string, userEmail?: string) => {
      setState({isCancellingMember: true});
      const group = getState().groups[groupId];
      if (!group) {
        showToast({
          message: 'The group does not exist anymore',
          colorScheme: 'crimsonRed',
        });
        setState({isCancellingMember: false});
        return false;
      }

      // call API
      const response = await fetchWithTimeout(
        'https://localhost:8080/cancel-group-member',
        {
          method: 'post',
        },
      );

      const {user: currentUser, updateUser} = useAuthStore.getState();
      let user: User | null = null;

      if (!response || !response.ok) {
        // in-memory strategy
        const {users, removeInvitedGroupId} = useUserStore.getState();
        const {removeInvitedMemberId} = getState();
        user = userEmail ? users[userEmail] : currentUser;

        if (user) {
          removeInvitedMemberId(groupId, user.id);
          removeInvitedGroupId(user.email, groupId);
        }
      } else {
        // TODO: proceed the API response object
      }

      setState({isCancellingMember: false});
      updateUser();
      // TODO: optionally create notification to member
      showToast({
        title: 'Success',
        message: `Cenceled ${user?.firstName} from group ${group.name}`,
        colorScheme: 'jadeGreen',
      });
      return true;
    },
    getIsOwner: (group, user) => {
      const currentUser = user || useAuthStore.getState().user;

      return group?.ownerId === currentUser?.id;
    },
    getIsMember: (group, user) => {
      const currentUser = user || useAuthStore.getState().user;
      if (!currentUser) {
        return false;
      }

      return group?.memberIds.includes(currentUser.id);
    },
    getIsInvited: (group, user) => {
      const currentUser = user || useAuthStore.getState().user;
      if (!currentUser) {
        return false;
      }

      return group?.invitedMemberIds.includes(currentUser.id);
    },

    fetchStarWarStarshipById: () => {
      return Promise.resolve(null);
    },
  })),
);

export default useGroupStore;
