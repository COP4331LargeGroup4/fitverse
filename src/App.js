import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { HomepageLayout } from './Home';
//import { LoginForm } from './Login'
import {SignIn, SignUp} from './UserAuthForms';
import Dashboard from './Dashboard';
import ResetPassword from './ResetPassword';
import Terms from './Terrms';
import PrivacyPolicy from './PrivacyPolicy';

function App() {
  return (
	<Router>
	  <Switch>
		<Route exact path='/' component={() => <HomepageLayout />} />
		<Route exact path='/signin' component={() => <SignIn />} />
		<Route exact path='/signup' component={() => <SignUp />} />
		<Route exact path='/resetpassword' component={() => <ResetPassword />} />
		<Route exact path='/dashboard' component={() => <Dashboard />} />
		<Route exact path='/terms' component={() => <Terms />} />
		<Route exact path='/privacy' component={() => <PrivacyPolicy />} />


		{/* Keep this Route last */}
		<Route exact path='*'>
		  <Redirect to ='/'/>
		</Route>
	  </Switch>
	</Router>
  );
}

export default App;
