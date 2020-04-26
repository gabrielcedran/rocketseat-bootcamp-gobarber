import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthenticationRoutes from './routes/routes';
import ContextsLoader from './hooks/ContextsLoader';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <ContextsLoader>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <AuthenticationRoutes />
      </View>
    </ContextsLoader>
  </NavigationContainer>
);

export default App;
