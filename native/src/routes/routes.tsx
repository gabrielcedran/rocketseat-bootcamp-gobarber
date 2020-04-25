import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';

const Authentication = createStackNavigator();

const AuthenticationRoutes: React.FC = () => (
  <Authentication.Navigator>
    <Authentication.Screen name="SignIn" component={SignIn} />
    <Authentication.Screen name="SignUp" component={SignUp} />
  </Authentication.Navigator>
);

export default AuthenticationRoutes;
