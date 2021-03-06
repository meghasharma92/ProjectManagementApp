import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects: null
};

export const projectsReducer = (state = initialState, action) => {
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

// export default projectsReducer;
