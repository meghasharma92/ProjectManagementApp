import React from 'react';

const highchart = (props) => {

	let content = props.show? <div className={classes.Backdrop} onClick={props.clicked}></div> : null;
	return(content);
}

export default highchart;