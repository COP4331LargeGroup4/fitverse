import React from 'react';
import { Navigation } from './Navigation'
import jwtdecode from 'jwt-decode';

function InteriorLayout(props) {
	// check if user is logged in
	if (localStorage.getItem('jwt') !== null) {
		var decodedjwt = jwtdecode(localStorage.getItem('jwt'));

		if (decodedjwt.exp < Math.round((new Date()).getTime() / 1000)) {
			window.location.href = '/';
			localStorage.removeItem('jwt');
			localStorage.removeItem('user');
			return (null);
		}
	}
	else {
		window.location.href = '/';
		localStorage.removeItem('jwt');
		localStorage.removeItem('user');
		return (null);
	}

	return (
		<div  data-testid="body" style={{ display: 'flex' }}>
			<Navigation title={props.content.title} />
			{props.content.page}
		</div>
	)
}

export default InteriorLayout;
