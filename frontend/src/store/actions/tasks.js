import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setTasks = (tasks) => {
    return {
        type: actionTypes.SET_TASKS,
        tasks: tasks
    }
}

export const initTasks = () => {
    console.log('COming in the initTasks');
    return dispatch => {
        // axios.get('/projects.json')
		// .then(response => {
		// 	dispatch(setProjects(response.data));
		// })
        // .catch(error => {
        //     console.log(error);
        // })

        const tasks = [
            {id: 1, name: 'Task1', description: 'Project1' },
            {id: 2, name: 'Task2', description: 'Project2' },
            {id: 3, name: 'Task3', description: 'Project3' }
          ]
          dispatch(setTasks(tasks));
    }
}