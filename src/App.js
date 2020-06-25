import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomepageLayout } from './Home';
import { LoginForm } from './Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={() => <HomepageLayout />} />
        <Route exact path='/login' component={() => <LoginForm />} />
      </Switch>
    </Router>
  );
}

export default App;
