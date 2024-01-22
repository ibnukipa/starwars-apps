import React from 'react';
import {useBottomSheet} from '@gorhom/bottom-sheet';

import {SecondaryHeaderProps} from './SecondaryHeader.tsx';
import {SecondaryHeader} from './index.ts';

const SecondaryHeaderWithInSheet: React.FC<SecondaryHeaderProps> = props => {
  const {close} = useBottomSheet();
  return <SecondaryHeader hasNoPaddingTop onClosePress={close} {...props} />;
};

export default SecondaryHeaderWithInSheet;
