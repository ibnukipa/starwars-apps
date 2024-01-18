import React, {memo} from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from 'react-native';
import {isIOS} from '../../utils';

const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = props => {
  return (
    <RNKeyboardAvoidingView
      {...props}
      behavior={isIOS ? 'padding' : undefined}
    />
  );
};

KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';

export default memo(KeyboardAvoidingView);
