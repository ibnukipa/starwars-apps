import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {isIOS} from '../utils';

const useKeyboardAppearance = (): boolean => {
  const [isKeyboardShowing, setIsKeyboardShowing] = useState(false);

  useEffect(() => {
    const keyboardDidShowEvent = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShowing(true);
    });

    const keyboardWillHideEvent = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        isIOS && setIsKeyboardShowing(false);
      },
    );

    const keyboardDidHideEvent = Keyboard.addListener('keyboardDidHide', () => {
      !isIOS && setIsKeyboardShowing(false);
    });

    return () => {
      keyboardWillHideEvent.remove();
      keyboardDidShowEvent.remove();
      keyboardDidHideEvent.remove();
    };
  }, []);

  return isKeyboardShowing;
};

export default useKeyboardAppearance;
