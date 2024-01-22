import useGroupStore from '../stores/groups.ts';
import {useMemo} from 'react';
import {User} from '../stores';

const useMemberStatusInGroup = (id: string, user?: User) => {
  const [getIsOwner, getIsMember, getIsInvited, group] = useGroupStore(
    state => [
      state.getIsOwner,
      state.getIsMember,
      state.getIsInvited,
      state.groups[id],
    ],
  );

  const isMember = useMemo(
    () => getIsMember(group, user),
    [getIsMember, group, user],
  );
  const isOwner = useMemo(
    () => getIsOwner(group, user),
    [getIsOwner, group, user],
  );
  const isInvited = useMemo(
    () => getIsInvited(group, user),
    [getIsInvited, group, user],
  );

  return {
    isOwner,
    isMember,
    isInvited,
    group,
    ownerId: group.ownerId,
  };
};

export default useMemberStatusInGroup;
