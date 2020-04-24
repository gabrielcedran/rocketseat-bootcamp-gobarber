import React from 'react';
import GlobalStyles from './styles/global.styles';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ContextsLoader from './hooks/ContextsLoader';

const App: React.FC = () => {
  return (
    <>
      <ContextsLoader>
        <SignIn />
      </ContextsLoader>

      <GlobalStyles />
    </>
  );
};

export default App;
