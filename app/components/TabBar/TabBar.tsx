import React, {useCallback, useMemo, useState} from 'react';
import {Image, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import styles from './styles.ts';
import {Icon, IconSize} from '../Icon';
import {IColors, Icons, IIcons} from '../../constants';
import Text from '../Text/Text.tsx';
import {BaseStyle} from '../../styles/base.ts';

const TabBarItem: React.FC<
  BottomTabBarProps & {
    index: number;
    route: BottomTabBarProps['state']['routes'][0];
  }
> = ({state, navigation, route, index}) => {
  const [isPressing, setIsPressing] = useState(false);

  const isFocused = useMemo(() => {
    return state.index === index;
  }, [state.index, index]);

  const [icon, label] = useMemo<[IIcons, string?]>(() => {
    switch (route.name) {
      case 'Home':
        return ['home', 'home'];
      case 'Notification':
        return ['bell', 'inbox'];
      case 'Logo':
        return ['logoOutline'];
      default:
        return ['accessibility', 'none'];
    }
  }, [route.name]);

  const iconColor = useMemo<IColors>(() => {
    if (isPressing && !isFocused) {
      return 'victoriaBlue';
    }

    if (!isPressing && !isFocused) {
      return 'neutralDisabledText';
    }

    if (isFocused) {
      return 'victoriaBluePlus1';
    }

    return 'citrusYellow';
  }, [isPressing, isFocused]);

  const onPress = useCallback(() => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  }, [isFocused, navigation, route.key, route.name, route.params]);

  const onLongPress = useCallback(() => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  }, [navigation, route.key]);

  const onPressIn = useCallback(() => {
    setIsPressing(true);
  }, []);

  const onPressOut = useCallback(() => {
    setIsPressing(false);
  }, []);

  if (route.name === 'Logo') {
    return (
      <SafeAreaView style={styles.item} edges={['bottom']}>
        <Image style={styles.logo} source={Icons.logoOutline} />
      </SafeAreaView>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <SafeAreaView style={styles.item} edges={['bottom']}>
        <Icon isDisabled color={iconColor} size={IconSize.HUGE} name={icon} />
        <Text bold color={iconColor}>
          {label?.toUpperCase()}
        </Text>
      </SafeAreaView>
    </Pressable>
  );
};

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  ...props
}) => {
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={[BaseStyle.shadowFaceUp, styles.container]}>
      {state.routes.map((route, index) => {
        return (
          <TabBarItem
            {...props}
            route={route}
            key={`${route.name}-${index}`}
            index={index}
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />
        );
      })}
    </SafeAreaView>
  );
};

export default TabBar;
