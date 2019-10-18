import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
	} from 'reactstrap';
  
class Layout extends Component {
	
	constructor(props) {
	  super(props);
  
	  this.toggle = this.toggle.bind(this);
	  this.state = {
		isOpen: false
	  };
	}

	toggle() {
	  this.setState({
		isOpen: !this.state.isOpen
	  });
	}

	render() {
	  return (
		<Aux>
		  <Navbar color="light" light expand="md">
			<NavbarBrand href="/">Project Management App</NavbarBrand>
			<NavbarToggler onClick={this.toggle} />
			<Collapse isOpen={this.state.isOpen} navbar>
			  <Nav className="ml-auto" navbar>
			  {
				(this.props.isAuthenticated) ? 
				<Aux>
				<NavItem>
				  <NavLink href="/projects">Projects</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink href="/tasks">Tasks</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink href="/dashboard">Dashboard</NavLink>
				</NavItem>
				<NavItem>
				  <NavLink href="/logout">Logout</NavLink>
				</NavItem>
				</Aux>
				:
				<NavItem>
				  <NavLink href="/login" active >Login</NavLink>
				</NavItem>
			}
			</Nav>
			</Collapse>
		  </Navbar>
		  <div className={classes.Content} >
						{this.props.children}
		  </div>
		</Aux>
	  );
	}
}  

const mapStatetoProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

export default connect(mapStatetoProps)(Layout);