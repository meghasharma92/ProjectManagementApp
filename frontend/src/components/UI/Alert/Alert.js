import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class CustomAlert extends Component {
    
  state = {
    visible: true
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Alert color={this.props.color} isOpen={this.state.visible} toggle={this.onDismiss}>
        {this.props.message}
      </Alert>
    );
  }
}


export default CustomAlert;
