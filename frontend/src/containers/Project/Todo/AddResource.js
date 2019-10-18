import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import CustomModal from '../../../components/UI/Modal/Modal';

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
                 title= "Assign Task" body={form}
                 submitHandler = {this.deleteHandler}
                 submit="CONTINUE" cancel="CANCEL"/>
                );
	}

}

	
export default NewTask;