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
        <Label for="resourceName">Select Resource: </Label>
        <Input type="select" name="Resource Name" id="resourceName">
          <option>Megha</option>
          <option>Test</option>
        </Input>
      </FormGroup>
    </Form>
  </div>
        return (
                <CustomModal isOpen={this.state.modal} toggle={this.toggle} 
                 title= "Assign Project" body={form}
                 submitHandler = {this.deleteHandler}
                 submit="CONTINUE" cancel="CANCEL"/>
                );
	}

}

	
export default NewTask;