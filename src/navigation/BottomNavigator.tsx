import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import SchoolDataScreen from '../screens/SchoolDataScreen';
import SchoolRecordScreen from '../screens/SchoolRecordScreen';
import { Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarLabel = ({ label, color }: { label: string; color: string }) => (
  <Text style={[styles.tabLabel, { color }]}>{label}</Text>
);

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#E6F7FF',
          height: 90,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopColor: '#B3D9FF',
          borderTopWidth: 2,
        },
        tabBarActiveTintColor: '#0056b3',
        tabBarInactiveTintColor: '#5A9BD4',
        tabBarLabel: ({ focused, color }) => {
          const label =
            route.name === 'Home'
              ? 'Home'
              : route.name === 'School Data'
              ? 'School Data'
              : route.name === 'School Record'
              ? 'School Records'
              : '';
          return <CustomTabBarLabel label={label} color={color} />;
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'School Data') {
            iconName = 'book';
          } else if (route.name === 'School Record') {
            iconName = 'bars';
          } else {
            iconName = 'question';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="School Data" component={SchoolDataScreen} />
      <Tab.Screen name="School Record" component={SchoolRecordScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default BottomNavigator;
