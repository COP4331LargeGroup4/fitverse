import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { HomepageLayout } from './Home';
import {SignIn, SignUp, ResetPassword} from './UserAuthForms';
import Dashboard from './Dashboard';
import Terms from './Terms';
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
