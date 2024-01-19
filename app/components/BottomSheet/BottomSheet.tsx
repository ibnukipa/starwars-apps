import React, {forwardRef, useCallback} from 'react';
import GBottomSheet, {
  BottomSheetProps as GBottomSheetProps,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

export interface BottomSheetProps extends GBottomSheetProps {
  isDisabledBackdrop?: boolean;
}

type BottomSheet = GBottomSheet;

const BottomSheet = forwardRef<BottomSheet, BottomSheetProps>((props, ref) => {
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      );
    },
    [],
  );

  return (
    <GBottomSheet
      index={-1}
      ref={ref}
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={props.isDisabledBackdrop ? undefined : renderBackdrop}
      {...props}
    />
  );
});

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
