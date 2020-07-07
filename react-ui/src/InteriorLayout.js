import React from 'react';
import { Navigation } from './Navigation'

function InteriorLayout(props) {
    return (
        <div style={{display: 'flex'}}>
            <Navigation title={props.content.title}/>
            {props.content.page}
        </div>
    )
}

export default InteriorLayout;
