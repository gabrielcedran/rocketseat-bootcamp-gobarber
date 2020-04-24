import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global.styles';
import Routes from './routes/routes';
import ContextsLoader from './hooks/ContextsLoader';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ContextsLoader>
        <Routes />
      </ContextsLoader>

      <GlobalStyles />
    </BrowserRouter>
  );
};

export default App;
