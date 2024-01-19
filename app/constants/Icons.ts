import {Leaves} from '../types/base.ts';

const Icons = {
  accessibility: require('../assets/icons/accessibility.png'),
  album: require('../assets/icons/album.png'),
  arrowUpRound: require('../assets/icons/arrow-up-round.png'),
  bell: require('../assets/icons/bell.png'),
  blackHole: require('../assets/icons/black-hole.png'),
  camera: require('../assets/icons/camera.png'),
  chefHatHeart: require('../assets/icons/chef-hat-heart.png'),
  close: require('../assets/icons/close.png'),
  dna: require('../assets/icons/dna.png'),
  dumbbell: require('../assets/icons/dumbbell.png'),
  eye: require('../assets/icons/eye.png'),
  gallery: require('../assets/icons/gallery.png'),
  galleryEdit: require('../assets/icons/gallery-edit.png'),
  home: require('../assets/icons/home.png'),
  mailbox: require('../assets/icons/mailbox.png'),
  masks: require('../assets/icons/masks.png'),
  medal: require('../assets/icons/medal.png'),
  meditation: require('../assets/icons/meditation.png'),
  suitcase: require('../assets/icons/suitcase.png'),
  usersGroup: require('../assets/icons/users-group.png'),
};

export type IIcons = Leaves<typeof Icons>;

export default Icons;
