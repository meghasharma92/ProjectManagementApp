import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import axios from '../../../axios-orders';
import FormContainer from '../../../hoc/FormContainer/FormContainer';
import CustomModal from '../../../components/UI/Modal/Modal';
import CustomAlert from '../../../components/UI/Alert/Alert';

class NewTask extends Component {

	state = {
		modal: true
	}

	componentDidMount(){
		console.log('New todoooooooo');
    }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }   
    
	render(){
    let form = <div>
    <Form>
      <FormGroup>
        <Label for="taskName">Task Name:</Label>
        <Input type="text" name="name" id="name" placeholder="Name" />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description: </Label>
        <Input type="text" name="description" id="description" placeholder="Description" />
      </FormGroup>
    </Form>
  </div>
        return (
                <CustomModal isOpen={this.state.modal} toggle={this.toggle} 
                 title= "New Task" body={form}
                 submitHandler = {this.deleteHandler}
                 submit="CONTINUE" cancel="CANCEL"/>
                );
	}

}

	
export default NewTask;