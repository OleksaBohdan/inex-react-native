import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons//MaterialIcons';

import Report from '../screens/Report';
import Categories from '../screens/Category';
import Settings from '../screens/Settings';

import { TodayStackNavigator } from '../screens/Today';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Today':
              iconName = focused ? 'today' : 'today';
              break;
            case 'Report':
              iconName = focused ? 'bar-chart' : 'bar-chart';
              break;
            case 'Categories':
              iconName = focused ? 'list' : 'list';
              break;
            case 'Settings':
              iconName = focused ? 'person' : 'person';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Today" component={TodayStackNavigator} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default MainTabs;
