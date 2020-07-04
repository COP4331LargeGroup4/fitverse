import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { HomepageLayout } from './Home';
import Dashboard from './Dashboard';
import InteriorLayout from './InteriorLayout'
import Calendar from './Calendar';
import Profile from './Profile'
import { SignIn, SignUp, ResetPassword } from './UserAuthForms';
import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';

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
