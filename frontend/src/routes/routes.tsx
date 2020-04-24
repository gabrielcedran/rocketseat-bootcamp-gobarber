import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/sign-up" exact component={SignUp} />
  </Switch>
);

export default Routes;
