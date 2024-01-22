import {Leaves} from '../types/base.ts';

const Icons = {
  accessibility: require('../assets/icons/accessibility.png'),
  album: require('../assets/icons/album.png'),
  arrowUpRound: require('../assets/icons/arrow-up-round.png'),
  bankNote: require('../assets/icons/banknote.png'),
  bell: require('../assets/icons/bell.png'),
  blackHole: require('../assets/icons/black-hole.png'),
  box: require('../assets/icons/box.png'),
  camera: require('../assets/icons/camera.png'),
  chefHatHeart: require('../assets/icons/chef-hat-heart.png'),
  close: require('../assets/icons/close.png'),
  dna: require('../assets/icons/dna.png'),
  dumbbell: require('../assets/icons/dumbbell.png'),
  eye: require('../assets/icons/eye.png'),
  gallery: require('../assets/icons/gallery.png'),
  galleryEdit: require('../assets/icons/gallery-edit.png'),
  handStars: require('../assets/icons/hand-stars.png'),
  home: require('../assets/icons/home.png'),
  mailbox: require('../assets/icons/mailbox.png'),
  masks: require('../assets/icons/masks.png'),
  medal: require('../assets/icons/medal.png'),
  meditation: require('../assets/icons/meditation.png'),
  planet: require('../assets/icons/planet.png'),
  spedometerLow: require('../assets/icons/spedometer-low.png'),
  suitcase: require('../assets/icons/suitcase.png'),
  userHands: require('../assets/icons/user-hands.png'),
  userId: require('../assets/icons/user-id.png'),
  usersGroup: require('../assets/icons/users-group.png'),

  logoOutline: require('../assets/logo_outline.png'),
};

export type IIcons = Leaves<typeof Icons>;

export default Icons;
