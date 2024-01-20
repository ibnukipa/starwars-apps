import {User} from '../users.ts';

const userSeed: Record<User['email'], User> = {
  'luke.skywalker@gmail.com': {
    id: '1',
    email: 'luke.skywalker@gmail.com',
    firstName: 'Luke',
    lastName: 'Skywalker',
    password: 'test',
    nameAlias: 'LS',
    avatar: '',
    jobTitle: 'Jedi',
    startWarProfile: {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
  'c.3po@gmail.com': {
    id: '2',
    email: 'c.3po@gmail.com',
    firstName: 'C-30',
    lastName: '',
    password: 'test',
    nameAlias: 'C-',
    avatar: '',
    jobTitle: 'Pilot',
    startWarProfile: {
      name: 'C-3PO',
      height: '167',
      mass: '75',
      hair_color: 'n/a',
      skin_color: 'gold',
      eye_color: 'yellow',
      birth_year: '112BBY',
      gender: 'n/a',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
  'r2.d2@gmail.com': {
    id: '3',
    email: 'r2.d2@gmail.com',
    firstName: 'R2-D2',
    lastName: '',
    password: 'test',
    nameAlias: 'R2',
    avatar: '',
    jobTitle: 'Pilot',
    startWarProfile: {
      name: 'R2-D2',
      height: '96',
      mass: '32',
      hair_color: 'n/a',
      skin_color: 'white, blue',
      eye_color: 'red',
      birth_year: '33BBY',
      gender: 'n/a',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
  'darth.vader@gmail.com': {
    id: '4',
    email: 'darth.vader@gmail.com',
    firstName: 'Darth',
    lastName: 'Vader',
    password: 'test',
    nameAlias: 'DV',
    avatar: '',
    jobTitle: 'Jedi',
    startWarProfile: {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
  'leia.organa@gmail.com': {
    id: '5',
    email: 'leia.organa@gmail.com',
    firstName: 'Leia',
    lastName: 'Organa',
    password: 'test',
    nameAlias: 'LO',
    avatar: '',
    jobTitle: 'Commander',
    startWarProfile: {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '19BBY',
      gender: 'female',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
  'owen.lars@gmail.com': {
    id: '6',
    email: 'owen.lars@gmail.com',
    firstName: 'Owen',
    lastName: 'Lars',
    password: 'test',
    nameAlias: 'OL',
    avatar: '',
    jobTitle: 'Pilot',
    startWarProfile: {
      name: 'Owen Lars',
      height: '178',
      mass: '120',
      hair_color: 'brown, grey',
      skin_color: 'light',
      eye_color: 'blue',
      birth_year: '52BBY',
      gender: 'male',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
  'beru.lars@gmail.com': {
    id: '7',
    email: 'beru.lars@gmail.com',
    firstName: 'Beru Whitesun',
    lastName: 'Lars',
    password: 'test',
    nameAlias: 'BW',
    avatar: '',
    jobTitle: 'Commander',
    startWarProfile: {
      name: 'Beru Whitesun lars',
      height: '165',
      mass: '75',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'blue',
      birth_year: '47BBY',
      gender: 'female',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
  'r5.d4@gmail.com': {
    id: '8',
    email: 'r5.d4@gmail.com',
    firstName: 'R5-D4',
    lastName: '',
    password: 'test',
    nameAlias: 'R5',
    avatar: '',
    jobTitle: 'General',
    startWarProfile: {
      name: 'R5-D4',
      height: '97',
      mass: '32',
      hair_color: 'n/a',
      skin_color: 'white, red',
      eye_color: 'red',
      birth_year: 'unknown',
      gender: 'n/a',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
  'bigss.darklighter@gmail.com': {
    id: '9',
    email: 'bigss.darklighter@gmail.com',
    firstName: 'Biggs',
    lastName: 'Darklighter',
    password: 'test',
    nameAlias: 'BD',
    avatar: '',
    jobTitle: 'Commander',
    startWarProfile: {
      name: 'Biggs Darklighter',
      height: '183',
      mass: '84',
      hair_color: 'black',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '24BBY',
      gender: 'male',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
  'obi.kenobi@gmail.com': {
    id: '10',
    email: 'obi.kenobi@gmail.com',
    firstName: 'Obi-Wan',
    lastName: 'Kenobi',
    password: 'test',
    nameAlias: 'OK',
    avatar: '',
    jobTitle: 'Jedi',
    startWarProfile: {
      name: 'Obi-Wan Kenobi',
      height: '182',
      mass: '77',
      hair_color: 'auburn, white',
      skin_color: 'fair',
      eye_color: 'blue-gray',
      birth_year: '57BBY',
      gender: 'male',
    },
    groupIds: [],
    invitedGroupIds: [],
  },
};

export default userSeed;
