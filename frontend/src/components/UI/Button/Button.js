import React from 'react';
import { Button } from 'reactstrap';
import classes from './Button.module.css';

const button = (props) => {
		return(
			<Button 
			onClick={props.clicked}
			disabled={props.disabled}
			color = {props.disabled ? 'secondary' : props.btnType}
			className = {classes.Button}
			> {props.children} </Button>
			)
}

export default button;