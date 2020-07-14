import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { HomepageLayout } from './Home';
import Dashboard from './Dashboard';
import InteriorLayout from './InteriorLayout'
import Calendar from './Calendar';
import Profile from './Profile'
import { SignIn, SignUp, ResetPassword, VerifyEmail } from './UserAuthForms';
import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';
import Exercises from './Exercises';

const pages = {
	dashboard: {
		title: "Dashboard",
		path: "/dashboard",
		page: <Dashboard />
	},
	calendar: {
		title: "Calendar",
		path: "/calendar",
		page: <Calendar />
	},
	exercises: {
		title: "My Exercises",
		path: "/exercises",
		page: <Exercises />
	},
	profile: {
		title: "Profile",
		path: "/profile",
		page: <Profile />
	}
}

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={() => <HomepageLayout />} />
				<Route exact path='/signin' component={() => <SignIn />} />
				<Route exact path='/signup' component={() => <SignUp />} />
				<Route exact path='/resetpassword' component={() => <ResetPassword />} />
				<Route exact path='/terms' component={() => <Terms />} />
				<Route exact path='/privacy' component={() => <PrivacyPolicy />} />
				<Route exact path='/verify' component={() => <VerifyEmail />} />

				{/* interior pages */}
				{Object.keys(pages).map((key) => {
					return (
						<Route exact path={pages[key].path} component={() => <InteriorLayout content={pages[key]} />} />
					)
				})}


				{/* Keep this Route last */}
				<Route exact path='*'>
					<Redirect to='/' />
				</Route>
			</Switch>

		</Router>
	);
}

export default App;
