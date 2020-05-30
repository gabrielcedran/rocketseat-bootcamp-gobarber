import React from 'react';
import { Switch } from 'react-router-dom';
import CustomRoute from './CustomRoute';

import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Dashboard from '../pages/Dashboard/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <CustomRoute path="/" exact component={SignIn} />
    <CustomRoute path="/sign-up" component={SignUp} />
    <CustomRoute path="/forgot-password" component={ForgotPassword} />
    <CustomRoute path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
