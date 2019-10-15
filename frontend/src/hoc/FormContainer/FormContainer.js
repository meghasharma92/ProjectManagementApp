import React from 'react';
import classes from './FormContainer.module.css';

const formContainer = (props) => {
    return(
        <div className={classes.Container}>
            <div className={classes.Center}>
                <h2 align="center">{props.title}</h2>
            {props.children}
            </div>
        </div>
        );
};

export default formContainer;