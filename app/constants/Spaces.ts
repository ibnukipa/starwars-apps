import {isIOS} from '../utils';

const Spaces = {
  tiny: 8,
  small: 12,
  regular: 16,
  medium: 24,
  large: 36,
  presentationModal: isIOS ? 40 : undefined,
};

export default Spaces;
