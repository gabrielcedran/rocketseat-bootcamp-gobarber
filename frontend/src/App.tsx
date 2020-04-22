import React from 'react';
import GlobalStyles from './styles/global.styles';
import SignIn from './pages/SignIn/SignIn';

const App: React.FC = () => {
  return (
    <>
      <SignIn />
      <GlobalStyles />
    </>
  );
};

export default App;
