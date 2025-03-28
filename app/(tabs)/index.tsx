import * as React from 'react';
import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Image } from 'react-native';
import HomeScreen from './HomeScreen'; // Create this screen
import LoginScreen from './LoginScreen'; // Create this screen
import RegisterScreen from './RegisterScreen'; // Create this screen
import ChatScreen from './ChatScreen'; // Create this screen
import WishlistScreen from './WishlistScreen'; // Create this screen
import UserScreen from './UserScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let imageSource;

          if (route.name === 'HomeScreen') {
            imageSource = require('../../assets/images/search.png');
          } else if (route.name === 'UserScreen') {
            imageSource = require('../../assets/images/user.png');
          } else if (route.name === 'ChatScreen') {
            imageSource = require('../../assets/images/chat.png');
          } else if (route.name === 'WishlistScreen') {
            imageSource = require('../../assets/images/star.png');
          }
          return (
            <Image
              source={imageSource}
              style={{ width: size, height: size, marginTop: 20, tintColor: focused ? '#39FF14' : 'gray' }}
              resizeMode="contain"
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#39FF14',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black',
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="UserScreen" component={UserScreen} />
      <Tab.Screen name="WishlistScreen" component={WishlistScreen} />
    </Tab.Navigator>
  );
}

function LoginStack({ setIsAuthenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen">
        {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <PaperProvider>
      {isAuthenticated ? <MyTabs /> : <LoginStack setIsAuthenticated={setIsAuthenticated} />}
    </PaperProvider>
  );
}