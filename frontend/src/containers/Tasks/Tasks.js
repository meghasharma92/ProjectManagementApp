import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Table, Button, Alert } from 'reactstrap';
import classes from './Tasks.module.css';

import CustomModal from '../../components/UI/Modal/Modal';
import CustomAlert from '../../components/UI/Alert/Alert';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Tasks extends Component {
    state = {
        message: null,
        modal: false
    }

  componentDidMount() {
      this.props.onInitTasks();
  }

  deleteHandler = (id) => {
    this.toggle();
    this.setState({message: 'Deleted successfully'});
  }
  
  toggle = () => {
		this.setState(prevState => ({
      modal: !prevState.modal
    }));
	}

  
render(){

    if(!this.props.isAuthenticated){
      let redirect = <Redirect to="/login" />
      return(redirect);
    }
		  

    let projectRows = null;
    let notice = null;

    if(this.state.message) {
      notice =  <CustomAlert message={this.state.message} color="success" />
    }

    if (this.props.tasks){
      projectRows = (
        this.props.tasks.map(taskObject => {
        return(
          <tr key={taskObject.id}>
            <th scope="row">{taskObject.id}</th>
            <td>{taskObject.name}</td>
            <td>{taskObject.description}</td>
            <td>
            <Button color="success" size="sm" onClick={() => this.editHandler(taskObject.id)}>Update Status</Button> {' '}
            <Button color="danger" size="sm" onClick={() => this.toggle()}>Delete</Button> 
            </td>
          </tr>) 
        })
     )

    }

    return (
          <div className={classes.Container}>
           <CustomModal isOpen={this.state.modal} toggle={this.toggle} 
          title= "Delete Task" body="Are you sure you want to delete?"
          submitHandler = {this.deleteHandler} submit="CONTINUE" cancel="CANCEL"/>

           {notice}
          <div className={classes.Center}>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task Name</th>
                  <th>Status</th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>
              <tbody>
              {projectRows}
              </tbody>
            </Table>
            </div>
          </div>
          );
	}

}

const mapStatetoProps = state => {
		return {
      isAuthenticated: state.auth.token !== null,
      tasks: state.tasksReducer.tasks
		}
}

const mapDispatchtoProps = dispatch => {
	return{
        onInitTasks: () => dispatch(actions.initTasks())
	}
}
	
export default connect(mapStatetoProps,mapDispatchtoProps)(Tasks, axios);