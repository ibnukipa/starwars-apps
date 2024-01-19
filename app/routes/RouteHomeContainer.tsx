import React, {useCallback} from 'react';
import { View } from "react-native";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Home, Notification} from '../screens';
import {HomeTabParamList} from './types.ts';
import {TabBar} from '../components';

const HomeTab = createBottomTabNavigator<HomeTabParamList>();
const HomeTabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const RouteHomeContainer: React.FC = () => {
  const renderTabBar = useCallback((tabBarProps: BottomTabBarProps) => {
    return <TabBar {...tabBarProps} />;
  }, []);

  return (
    <HomeTab.Navigator
      screenOptions={HomeTabScreenOptions}
      tabBar={renderTabBar}>
      <HomeTab.Screen name={'Home'} component={Home} />
      <HomeTab.Screen name={'Logo'} component={View} />
      <HomeTab.Screen name={'Notification'} component={Notification} />
    </HomeTab.Navigator>
  );
};

RouteHomeContainer.displayName = 'RouteHomeContainer';

export default RouteHomeContainer;
