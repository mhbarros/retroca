import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Landing from './pages/Landing';
import SignInUser from './pages/SignInUser';
import SignUpUser from './pages/SignUpUser';
import HomeUser from './pages/HomeUser';

const Routes = () => (
  <BrowserRouter>
    <Route path={'/'} component={Landing} exact/>
    <Route path={'/signin/user'} component={SignInUser} />
    <Route path={'/signup/user'} component={SignUpUser} />
    <Route path={'/home'} component={HomeUser} />
  </BrowserRouter>
);

export default Routes
