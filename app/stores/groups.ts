import {getStarship, Starship} from '../apis';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {CreateGroupForm} from '../forms';
import {showToast} from '../components';
import {fetchWithTimeout} from '../utils';
import useAuthStore from './auth.ts';
import useUserStore from './users.ts';

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
}

interface GroupActions {
  // DB Operations
  add: (group: Group) => void;
  addMemberId: (groupId: string, email: string) => void;
  addInvitedMemberId: (groupId: string, email: string) => void;
  getFlattenGroups: () => Array<Group>;

  // side effect operations / state manipulation
  create: (groupForm: CreateGroupForm) => Promise<boolean>;
  accept: () => void;
  reject: () => void;
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

    add: group => {
      setState(state => {
        state.groups[group.id] = group;

        return state;
      });
    },
    addMemberId: () => {},
    addInvitedMemberId: () => {},
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
        'https://localhost:8080/sign-up',
        {
          method: 'post',
        },
      );

      const {user: owner} = useAuthStore.getState();
      if (!owner) {
        showToast({
          message: 'Please sign-in first',
          colorScheme: 'crimsonRed',
        });
        return false;
      }

      const {getUserIdsByEmails, addGroupIdByEmails} = useUserStore.getState();
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
      } else {
        // TODO: proceed the API response
      }

      if (newGroup) {
        addGroup(newGroup);
        addGroupIdByEmails(groupForm.invitedMemberEmails, newGroup.id);
        // TODO: create notification to invitee
      }

      setState({isCreating: false});
      // TODO: optionally create notification to owner
      showToast({
        title: 'Success',
        message: `Created new group ${groupForm.name}`,
        colorScheme: 'jadeGreen',
      });
      return true;
    },
    accept: () => {},
    // TODO: add reject functionality
    reject: () => {},
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
