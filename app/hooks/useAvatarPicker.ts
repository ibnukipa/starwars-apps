import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {useCallback} from 'react';

const OPTIONS: ImageLibraryOptions | CameraOptions = {
  mediaType: 'photo',
  quality: 0.5,
  includeBase64: true,
  maxWidth: 360,
  maxHeight: 360,
};

const useAvatarPicker = (setAvatarImage: (asset: string) => void) => {
  const avatarPickCameraPress = useCallback(() => {
    const launchCameraCall = async () => {
      const {assets} = await launchCamera(OPTIONS);
      if (assets?.[0].base64) {
        setAvatarImage(assets?.[0].base64);
      }
    };

    launchCameraCall();
  }, [setAvatarImage]);

  const avatarPickLibraryPress = useCallback(() => {
    const launchImageLibraryCall = async () => {
      const {assets} = await launchImageLibrary(OPTIONS);
      if (assets?.[0].base64) {
        setAvatarImage(assets?.[0].base64);
      }
    };

    launchImageLibraryCall();
  }, [setAvatarImage]);

  return {
    avatarPickCameraPress,
    avatarPickLibraryPress,
  };
};

export default useAvatarPicker;
