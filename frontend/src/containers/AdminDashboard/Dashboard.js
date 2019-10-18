import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Table, Button, Alert } from 'reactstrap';
import classes from './Dashboard.module.css';

import CustomModal from '../../components/UI/Modal/Modal';
import CustomAlert from '../../components/UI/Alert/Alert';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Dashboard extends Component {
    state = {
        message: null,
        modal: false,
        status: ['new', 'in_progress', 'done'],
        projects: ['Project1', 'Project2', 'Project3'],
        project_tasks: [
            {
                name: ['Project1','new'], value: [
                    {name: 'Task1', description: 'Task1'},
                    {name: 'Task2', description: 'Task2'}
                ]
                
            },
            {
                name: ['Project1','in_progress'], value: [
                    {name: 'Task5', description: 'Task1'},
                    {name: 'Task6', description: 'Task2'}
                ]
                
            },
            {
                name: ['Project2','in_progress'], value:[
                    {name: 'Task3', description: 'Task1'},
                    {name: 'Task4', description: 'Task2'}
                ]
            },
            {
                name: ['Project3','new'], value:[
                {name: 'Task1', description: 'Task1'} 
                ]
            }
        ]
    }

  componentDidMount() {
      this.props.onInitTasks();
  }
  
render(){

    if(!this.props.isAuthenticated){
      let redirect = <Redirect to="/login" />
      return(redirect);
    }
		  

    let projectRows = null;
    let projects_col = null;
    let notice = null;

    if(this.state.message) {
      notice =  <CustomAlert message={this.state.message} color="success" />
    }

    if(this.state.projects){
        projects_col =  this.state.projects.map(project => {
            return(<th key={project}>{project}</th>)
        })
    }

    function task_rows(statusObject,projects,project_tasks){
        return projects.map(project => {
        return(<td>{td_Row(statusObject,project,project_tasks)}</td>)
        })
    }

    function td_Row(statusObject, project, project_tasks){
        let taskArray = project_tasks.filter(function(item){
                    return item.name[1] == statusObject && item.name[0] == project;
            }) 
            if(taskArray.length == 1){
                return taskArray[0].value.map(taskObject => {
                    return(<p>{taskObject.name}</p>);
                })
            }
    }

    if(this.state.project_tasks){
        projectRows =  this.state.status.map(statusObject => {
            return (<tr key={statusObject}>
            <th scope="row">{statusObject}</th>
            {task_rows(statusObject,this.state.projects,this.state.project_tasks)}
            </tr>)
        })
    }

    return (
          <div className={classes.Container}>
          <div className={classes.Center}>
            <Table striped>
            <thead>
                <tr>
                  <th>Status</th>
                  {projects_col}
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
	
export default connect(mapStatetoProps,mapDispatchtoProps)(Dashboard, axios);