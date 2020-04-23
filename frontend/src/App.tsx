import React from 'react';
import GlobalStyles from './styles/global.styles';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
