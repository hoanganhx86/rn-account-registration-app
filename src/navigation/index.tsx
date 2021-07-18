import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Registration from '../screens/Registration';
import EmailVerification from '../screens/EmailVerification';

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Registration"
        options={{title: 'Register'}}
        component={Registration}
      />
      <Stack.Screen
        name="EmailVerification"
        options={{title: 'Email confirmation'}}
        component={EmailVerification}
      />
    </Stack.Navigator>
  );
}
