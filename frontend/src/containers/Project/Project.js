import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { Button, Table } from 'reactstrap';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import NewTask from './Todo/NewTask';
import AddTaskResource from './Todo/AddResource';
import AddProjectResource from './AddResource';

class Project extends Component {

    state = {
        projectName: null,
        todos: null,
        full_path: null
    }

	componentDidMount(){
    this.setState({full_path: this.props.history.location.pathname})
    this.setState({projectName: this.props.match.params.projectId, full_path: this.props.history.location.pathname})
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
  
  assignResource = () => {
    console.log(this.props.history.location.pathname);
		let path = this.props.history.location.pathname + '/assign-resource';
		this.props.history.replace(path);
  }
  
  addResource = () => {
    console.log(this.props.history.location.pathname);
		let path = this.props.history.location.pathname + '/add-resource';
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
                    <Button color="success" size="sm" onClick={() => this.assignResource()} >Assign</Button>{' '} 
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
              <Switch>
              <Route 
                  path= {this.props.match.path + '/new-todo'} exact
                  component={NewTask}>
              </Route> 
              <Route 
                  path={this.props.match.path + '/assign-resource'} exact
                  component={AddTaskResource}>
              </Route> 
              <Route 
                  path={this.props.match.path + '/add-resource'} exact
                  component={AddProjectResource}>
              </Route>
              </Switch> 
              <div align="right">
                <Button color="info" size="sm" onClick={() => this.createNewTask()} >Create New Task</Button>{' '} 
                <Button color="info" size="sm" onClick={() => this.addResource()}>Add New Resource</Button>{' '} 
              </div>
              <h4 align="center">Tasks</h4>
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