import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: null
    // projects: [
    //     {id: 1, name: 'Project1', description: 'Project1' },
    //     {id: 2, name: 'Project2', description: 'Project2' },
    //     {id: 3, name: 'Project3', description: 'Project3' }
    //   ]
};

const projectsReducer = (state = initialState, action) => {
            switch(action.type) {
                case actionTypes.SET_PROJECTS:
                    return {
                        ...state,
                        projects: action.projects,
                        error: false
                        }
               default:
                 return state;
            }
};

export default projectsReducer;
