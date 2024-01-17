import React, {
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Radii, Spaces} from '../../constants';
import {isIOS} from '../../utils';
import {Text} from '../Text';

export interface ToastProps extends ViewProps {}

export interface ToastOptions {
  title?: string;
  message: string;
}

export interface ToastRef {
  showToast: (option: ToastOptions) => void;
  hideToast: () => void;
}

const AnimatedKeyboardAvoidingView =
  Animated.createAnimatedComponent(KeyboardAvoidingView);

const DEFAULT_DURATION_FADE = 300;
const TOAST_DURATION = 5000;

const INITIAL_OPTION: ToastOptions = {
  title: '',
  message: '',
};

const Toast = forwardRef<ToastRef, ToastProps>((props, ref) => {
  const insets = useSafeAreaInsets();
  const [option, setOption] = useState<ToastOptions>(INITIAL_OPTION);
  const disableToClose = useRef(false);

  const {title, message} = option;
  const bottom = 0;
  const popAnim = useRef(new Animated.Value(bottom)).current;
  const resetTimeout = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    showToast: (_option: ToastOptions) => {
      if (_option?.message) {
        disableToClose.current = true;
        setOption(_option);
      }
    },
    hideToast: () => {
      if (!disableToClose.current) {
        instantPopOut();
      }
    },
  }));

  const setStateToInitial = () => {
    clearTimeout(resetTimeout.current);
    setOption(INITIAL_OPTION);
  };

  const popIn = () => {
    clearTimeout(resetTimeout.current);
    Animated.timing(popAnim, {
      toValue: 1,
      duration: DEFAULT_DURATION_FADE,
      useNativeDriver: true,
    }).start(popOut);
  };

  const popOut = () => {
    disableToClose.current = false;
    resetTimeout.current = setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: bottom,
        duration: DEFAULT_DURATION_FADE,
        useNativeDriver: true,
      }).start(setStateToInitial);
    }, TOAST_DURATION - DEFAULT_DURATION_FADE);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: bottom,
      duration: DEFAULT_DURATION_FADE,
      useNativeDriver: true,
    }).start(() => {
      setStateToInitial();
    });
  };

  useEffect(
    function popToast() {
      option.message && popIn();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [option],
  );

  return (
    <AnimatedKeyboardAvoidingView
      style={[
        styles.container,
        {
          marginBottom: Spaces.regular + insets.bottom,
          opacity: popAnim,
        },
      ]}
      keyboardVerticalOffset={Spaces.regular}
      behavior={isIOS ? 'padding' : undefined}>
      {!option.message ? null : (
        <View style={styles.messageContainer}>
          {option.title && (
            <Text bold color={'crimsonRed'}>
              {title}
            </Text>
          )}
          <Text color={'crimsonRed'}>{message}</Text>
        </View>
      )}
    </AnimatedKeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    minHeight: 1,
    minWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spaces.regular,
  },
  messageContainer: {
    padding: Spaces.small,
    borderRadius: Radii.medium,
    marginTop: Spaces.regular,
    backgroundColor: Colors.crimsonRedMin3,
  },
});

Toast.displayName = 'Toast';

export const ToastRef = React.createRef<ToastRef>();

export const showToast = (option: ToastOptions) => {
  if (ToastRef.current) {
    ToastRef.current.showToast(option);
  }
};

export const hideToast = () => {
  if (ToastRef.current) {
    ToastRef.current.hideToast();
  }
};

export default memo(Toast);