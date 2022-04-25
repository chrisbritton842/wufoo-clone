import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import SplashPage from './components/SplashPage';
import UserForms from './components/UserForms';
import BuildForm from './components/BuildForm';
import EditForm from './components/EditForm';
import ViewForm from './components/ViewForm';
import EndPage from './components/EndPage';
import SharePage from './components/ShareForm';
import FormEntries from './components/FormEntries';
import { authenticate } from './store/session';
import { Helmet } from 'react-helmet';
import favicon from './favicon.ico';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>RareForm</title>
        <link rel="icon" type="image/png" href={favicon} sizes="512x512"/>
      </Helmet>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true}>
            <SplashPage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/signup' exact={true}>
            <SignUpForm />
          </Route>
          <Route path='/form/:formId/:userId' exact={true}>
            <ViewForm />
          </Route>
          <Route path='/endpage' exact={true}>
            <EndPage />
          </Route>
          <ProtectedRoute path='/forms/:userId' exact={true} >
            <UserForms />
          </ProtectedRoute>
          <ProtectedRoute path='/build/:userId' exact={true} >
            <BuildForm />
          </ProtectedRoute>
          <ProtectedRoute path='/edit/:formId' exact={true} >
            <EditForm />
          </ProtectedRoute>
          <ProtectedRoute path='/forms/:formId/:userId/share' exact={true}>
            <SharePage />
          </ProtectedRoute>
          <ProtectedRoute path='/entry-manager/:formId' exact={true}>
            <FormEntries />
          </ProtectedRoute>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/build' exact={true} >
            <h1>My Home Page</h1>
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
