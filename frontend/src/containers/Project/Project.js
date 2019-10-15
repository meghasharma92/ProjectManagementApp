import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { Button, Table } from 'reactstrap';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import NewTask from './Todo/NewTask';
import AssignResource from './Resource/AssignResource';

class Project extends Component {

    state = {
        projectName: null,
        todos: null
    }

	componentDidMount(){
		console.log(this.props);
		console.log(this.props.match.params.projectId);
    this.setState({projectName: this.props.match.params.projectId})
    this.props.onInitProject();
  }
  
  cancelHandler = () => {
		this.props.history.goBack();
	}

	createNewTask = () => {
    console.log(this.props.history.location.pathname);
    let path = this.props.history.location.pathname + '/new-todo';
		this.props.history.replace(path);
  }
  
  assignNewResource = () => {
    console.log(this.props.history.location.pathname);
		let path = this.props.history.location.pathname + '/assign-resource';
		this.props.history.replace(path);
	}

	render(){


        let todos = <tr colSpan="4"><td>No Data available</td></tr>;
                  

        if (this.props.todos) {
            todos =  (
                this.props.todos.map(todoObject => {
                return(
                  <tr key={todoObject.id}>
                    <th scope="row">{todoObject.id}</th>
                    <td>{todoObject.name}</td>
                    <td>{todoObject.description}</td>
                    <td>{todoObject.status}</td>
                    <td>
                    <Button color="success" size="sm" >Assign</Button>{' '} 
                    <Button color="info" size="sm" >Edit</Button>{' '} 
                    <Button color="danger" size="sm" >Delete</Button>{' '} 
                    </td>
                  </tr>) 
                })
             )
        }

        let resources = <tr colSpan="4"><td>No Data available</td></tr>;

        if (this.props.resources) {
          resources =  (
              this.props.resources.map(resourceObj => {
              return(
                <tr key={resourceObj.id}>
                  <th scope="row">{resourceObj.id}</th>
                  <td>{resourceObj.name}</td>
                  <td>
                    <Button color="danger" size="sm" >Remove</Button>{' '} 
                    </td>
                </tr>) 
              })
           )
      }
        
        let project = 'Project ' + this.state.projectName;

        return (<Aux>
              <h3 align="center"> 
              {project}  
              </h3>
              <div align="right">
                <Button color="info" size="sm" onClick={() => this.createNewTask()} >Create New Task</Button>{' '} 
                <Button color="info" size="sm" onClick={() => this.assignNewResource()}>Assign New Resource</Button>{' '} 
              </div>
              <h4 align="center">Tasks</h4>
              <Route 
                  path= {this.props.match.path + '/new-todo'}
                  component={NewTask}>
              </Route> 
              <Route 
                  path={this.props.match.path + '/assign-resource'}
                  component={AssignResource}>
              </Route> 
              
              <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>
              <tbody>
              {todos}
              </tbody>
            </Table>
            <h4 align="center">Resources</h4>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Resource Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {resources}
              </tbody>
            </Table>
          </Aux>
                );
	}

}

const mapStatetoProps = state => {
		return {
      isAuthenticated: state.auth.token !== null,
      todos: state.projectReducer.todos,
      resources: state.projectReducer.resources
		}
}

const mapDispatchtoProps = dispatch => {
	return{
    onInitProject: () => dispatch(actions.projectTodos())
	}
}
	
	
export default connect(mapStatetoProps,mapDispatchtoProps)(Project, axios);