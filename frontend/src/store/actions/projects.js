import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setProjects = (projects) => {
    return {
        type: actionTypes.SET_PROJECTS,
        projects: projects
    }
}

export const initProjects = () => {
    console.log('COming in the initProjects');
    return dispatch => {
        // axios.get('/projects.json')
		// .then(response => {
		// 	dispatch(setProjects(response.data));
		// })
        // .catch(error => {
        //     console.log(error);
        // })

        const projects = [
            {id: 1, name: 'Project1', description: 'Project1' },
            {id: 2, name: 'Project2', description: 'Project2' },
            {id: 3, name: 'Project3', description: 'Project3' }
          ]
          dispatch(setProjects(projects));
    }
}