import React from 'react';
import logoImage from '../../assets/images/Logo/project_manage.jpg';
import classes from './Logo.module.css';

const logo = (props) => {
	return(<div className={classes.Logo}>
				<img src={logoImage}/>
			</div>)
}

export default logo;