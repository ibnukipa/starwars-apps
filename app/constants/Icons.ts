import {Leaves} from '../types/base.ts';

const Icons = {
  close: require('../assets/icons/close.png'),
  galleryEdit: require('../assets/icons/gallery-edit.png'),
  gallery: require('../assets/icons/gallery.png'),
  camera: require('../assets/icons/camera.png'),
  meditation: require('../assets/icons/meditation.png'),
};

export type IIcons = Leaves<typeof Icons>;

export default Icons;
