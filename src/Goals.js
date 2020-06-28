import React from 'react';
import Container from '@material-ui/core/Container';
import {useStyles} from './Navigation'

function Goals(props) {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                Goals go here pls halp
            </Container>
        </div>
    )
}

export default Goals;
