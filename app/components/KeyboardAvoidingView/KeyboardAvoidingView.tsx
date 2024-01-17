import React, {memo} from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from 'react-native';
import {Spaces} from '../../constants';
import {isIOS} from '../../utils';

const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = props => {
  return (
    <RNKeyboardAvoidingView
      {...props}
      keyboardVerticalOffset={Spaces.regular}
      behavior={isIOS ? 'padding' : undefined}
    />
  );
};

KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';

export default memo(KeyboardAvoidingView);
