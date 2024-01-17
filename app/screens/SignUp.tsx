import React from 'react';
import {View} from 'react-native';

import {Button, ButtonVariant, Text} from '../components';
import {BaseStyle} from '../styles/base.ts';

const SignUp: React.FC = () => {
  return (
    <View style={[BaseStyle.container, BaseStyle.pad]}>
      <Text
        fontWeight={'extraBold'}
        color={'citrusYellow'}
        style={BaseStyle.title}>
        StarWars: Sign Up
      </Text>
      <Text color={'neutralSecondaryText'} style={BaseStyle.subTitle}>
        Communication Apps
      </Text>
      <View>
        <Button style={BaseStyle.space} variant={ButtonVariant.TERTIARY}>
          Create
        </Button>
      </View>
    </View>
  );
};

SignUp.displayName = 'SignUpScreen';

export default SignUp;
