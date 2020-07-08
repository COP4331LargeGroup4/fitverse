import React from 'react';
import Container from '@material-ui/core/Container';
import {useStyles} from './Navigation'

function Exercises(props) {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                Exercises goes here pls halp
            </Container>
        </div>
    )
}

export default Exercises;
