import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Visiter from "./pages/Visiter";

import Home2 from "./pages/Home2";
import Visiter2 from "./pages/Visiter2";

import Home3 from "./pages/Home3";
import Visiter3 from "./pages/Visiter3";

import SignIn from "./pages/Login/SignIn";
import SignUp from "./pages/Login/SignUp";
import UserStore from "./store/users";

const App = () => {
  console.log("App component on");
  const { palette } = useSelector((state) => state);

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


          <Route path="/testfor/home">
            <Home />
          </Route>

          <Route path="/testfor/visiter">
            <Visiter />
          </Route>

          <Route path="/khg0343/home">
            <Home2 />
          </Route>
          <Route path="/khg0343/visiter">
            <Visiter2 />
          </Route>

          <Route path="/wodlxosxos/home">
            <Home3 />
          </Route>
          <Route path="/wodlxosxos/visiter">
            <Visiter3 />
          </Route>

        </Switch>
      </ThemeProvider>
    </UserStore>
  );
};

export default App;
