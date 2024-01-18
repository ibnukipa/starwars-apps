const getNameAlias = (firstName: string, lastName: string) => {
  if (!lastName && !firstName) {
    return undefined;
  }

  if (!lastName) {
    if (firstName.length > 1) {
      return `${firstName[0]}${firstName[1]}`;
    } else {
      return `${firstName[0]}${firstName[0]}`;
    }
  }

  if (!firstName) {
    if (lastName.length > 1) {
      return `${lastName[0]}${lastName[1]}`;
    } else {
      return `${lastName[0]}${lastName[0]}`;
    }
  }

  return `${firstName[0]}${lastName[0]}`;
};

export default getNameAlias;
