import React, { Component, useState, useContext} from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Visiter from './pages/Visiter';
import SignIn from './pages/Login/SignIn';
import SignUp from './pages/Login/SignUp';
import UserStore from './store/users'

const App = () => {
  console.log("App component on")
  const { palette } = useSelector(state => state);

  return (
    <UserStore>
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
        <Route path="/visiter">
          <Visiter />
        </Route>
        </Switch>
      </ThemeProvider>
    </UserStore>
  );
};

export default App;
