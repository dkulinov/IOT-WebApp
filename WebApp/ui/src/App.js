import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './components/Navbar/Navbar';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

class App extends React.Component {

  render() {
    return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/" exact render={() => <HomePage/>}/>
        <Route path="/login" render={() => <LoginPage/>} />
        <Route path="/register" render={() => <RegisterPage/>} />
      </Switch>
    </Router>
    );
  }
}

export default App;
