import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import FormContainer from '../../hoc/FormContainer/FormContainer';

class NewProject extends Component {

	state = {
		projects: []
	}

	componentDidMount(){
		console.log(this.props);
		// this.props.onInitIngredients();
	}
	render(){
        return (<FormContainer title="New Project">
                  <Form>
                    <FormGroup>
                      <Label for="projectName">Project Name:</Label>
                      <Input type="text" name="name" id="name" placeholder="Name" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="description">Description: </Label>
                      <Input type="text" name="description" id="description" placeholder="Description" />
                    </FormGroup>
                    <Button>Submit</Button>
                  </Form>
                </FormContainer>
                );
	}

}

const mapStatetoProps = state => {
		return {
			isAuthenticated: state.auth.token !== null
		}
}

const mapDispatchtoProps = dispatch => {
	return{
	}
}
	
export default connect(mapStatetoProps,mapDispatchtoProps)(NewProject, axios);