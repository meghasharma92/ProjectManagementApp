import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CustomModal extends Component {
	render(){
		return(
			<div>
        	<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.submitHandler}>{this.props.submit}</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>{this.props.cancel}</Button>
          </ModalFooter>
        </Modal>
      </div>
		);
	}

		
}

export default CustomModal;