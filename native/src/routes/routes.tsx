import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import { AuthProvider } from '../hooks/AuthContext';

const Authentication = createStackNavigator();

const AuthenticationRoutes: React.FC = () => (
  <AuthProvider>
    <Authentication.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Authentication.Screen name="SignIn" component={SignIn} />
      <Authentication.Screen name="SignUp" component={SignUp} />
    </Authentication.Navigator>
  </AuthProvider>
);

export default AuthenticationRoutes;
