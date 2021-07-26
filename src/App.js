import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/Login/SignIn';
import SignUp from './pages/Login/SignUp';

const App = () => {
  const { palette } = useSelector(state => state);

  return (
    <ThemeProvider theme={palette}>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
