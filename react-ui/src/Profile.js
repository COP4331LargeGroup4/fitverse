import React from 'react';
import Container from '@material-ui/core/Container';
import {useStyles} from './Navigation'

function Profile(props) {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                Profile goes here pls halp
            </Container>
        </div>
    )
}

export default Profile;
