import React from 'react';
import Container from '@material-ui/core/Container';
import {useStyles} from './Navigation'

function MyExercises(props) {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                My Exercise page goes here
            </Container>
        </div>
    )
}

export default MyExercises;