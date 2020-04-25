import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';

const Authentication = createStackNavigator();

const AuthenticationRoutes: React.FC = () => (
  <Authentication.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Authentication.Screen name="SignUp" component={SignUp} />
    <Authentication.Screen name="SignIn" component={SignIn} />
  </Authentication.Navigator>
);

export default AuthenticationRoutes;
