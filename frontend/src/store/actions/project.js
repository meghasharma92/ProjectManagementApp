import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setProjectTodos = (todos) => {
    return {
        type: actionTypes.PROJECT_TODOS,
        todos: todos
    }
}

export const setprojectResources = (resources) => {
    return {
        type: actionTypes.PROJECT_RESOURCES,
        resources: resources
    }
}

export const projectTodos = () => {
    return dispatch => {
        // axios.get('/projects.json')
		// .then(response => {
		// 	dispatch(setProjects(response.data));
		// })
        // .catch(error => {
        //     console.log(error);
        // })

        const todos = [
            {id: 1, name: 'Task1', description: 'Project1', status: 'done' },
            {id: 2, name: 'Task2', description: 'Project2', status: 'done'},
            {id: 3, name: 'Task3', description: 'Project3', status: 'done' }
          ]
          dispatch(setProjectTodos(todos));


        const resources = [
            {id: 1, name: 'Megha', email: 'Project1' },
            {id: 2, name: 'SHarma', email: 'Project2' },
            {id: 3, name: 'Test', email: 'Project3' }
          ]
        dispatch(setprojectResources(resources));
    }
}


