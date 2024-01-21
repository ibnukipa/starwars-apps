import {getStarship, Starship} from '../apis';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {CreateGroupForm} from '../forms';
import {showToast} from '../components';
import {fetchWithTimeout, removeValue} from '../utils';
import useAuthStore from './auth.ts';
import useUserStore, {User} from './users.ts';

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
}

interface GroupActions {
  // DB Operations
  add: (group: Group) => void;
  addMemberId: (groupId: string, userId: string) => void;
  removeMemberId: (groupId: string, userId: string) => void;
  addInvitedMemberId: (groupId: string, userId: string) => void;
  getFlattenGroups: () => Array<Group>;

  // side effect operations / state manipulation
  create: (groupForm: CreateGroupForm) => Promise<boolean>;
  accept: (groupId: string) => Promise<boolean>;
  reject: () => void;
  leave: () => void;
  removeOrLeaveMember: (groupId: string, userId?: string) => Promise<boolean>;
  getIsOwner: (group: Group) => boolean;
  getIsInvited: (group: Group) => boolean;
  getIsMember: (group: Group) => boolean;

  // API calls
  fetchStarWarStarshipById: (id: string) => Promise<Starship | null>;
}

const useGroupStore = create(
  immer<GroupState & GroupActions>((setState, getState) => ({
    groups: {},

    isCreating: false,
    isAccepting: false,
    isRemovingOrLeavingMember: false,

    add: group => {
      setState(state => {
        state.groups[group.id] = group;

        return state;
      });
    },
    addMemberId: (groupId, userId) => {
      setState(state => {
        state.groups[groupId].memberIds.push(userId);

        // remove invited memberId
        const invitedMemberIds = state.groups[groupId].invitedMemberIds;
        state.groups[groupId].invitedMemberIds = removeValue(
          invitedMemberIds,
          userId,
        );

        return state;
      });
    },
    removeMemberId: (groupId, userId) => {
      setState(state => {
        const memberIds = state.groups[groupId].memberIds;
        state.groups[groupId].memberIds = removeValue(memberIds, userId);

        return state;
      });
    },
    addInvitedMemberId: (groupId, userId) => {
      setState(state => {
        state.groups[groupId].invitedMemberIds.push(userId);

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

      const {getUserIdsByEmails, addGroupIdByEmails, addInvitedGroupIdByEmails} = useUserStore.getState();
      const {add: addGroup, groups} = getState();
      let newGroup: Group | null = null;

      if (!response || !response.ok) {
        // in-memory strategy
        const id = String(Object.keys(groups).length + 1);
        const starship = await getStarship(id);
        newGroup = {
          id,
          name: groupForm.name,
          description: groupForm.description,
          avatar: groupForm.avatar,
          nameAlias: groupForm.nameAlias,
          starWarsProfile: starship,
          ownerId: owner.id,
          memberIds: [owner.id],
          invitedMemberIds: getUserIdsByEmails(groupForm.invitedMemberEmails),
        };

        if (newGroup) {
          addGroup(newGroup);
          addGroupIdByEmails([owner.email], newGroup.id);
          addInvitedGroupIdByEmails(groupForm.invitedMemberEmails, newGroup.id);
          // TODO: create in app-notification to invitee
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
    // TODO: add leave functionality
    leave: () => {},
    // TODO: add remove member functionality
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
        'https://localhost:8080/accept-group',
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
    getIsOwner: (group: Group) => {
      const currentUser = useAuthStore.getState().user;

      return group.ownerId === currentUser?.id;
    },
    getIsMember: (group: Group) => {
      const currentUser = useAuthStore.getState().user;
      if (!currentUser) {
        return false;
      }

      return group.memberIds.includes(currentUser.id);
    },
    getIsInvited: (group: Group) => {
      const currentUser = useAuthStore.getState().user;
      if (!currentUser) {
        return false;
      }

      return group.invitedMemberIds.includes(currentUser.id);
    },

    fetchStarWarStarshipById: () => {
      return Promise.resolve(null);
    },
  })),
);

export default useGroupStore;
