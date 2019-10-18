import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasls: null
};

export const tasksReducer = (state = initialState, action) => {
            switch(action.type) {
                case actionTypes.SET_TASKS:
                    return {
                        ...state,
                        tasks: action.tasks,
                        error: false
                        }
               default:
                 return state;
            }
};

// export default tasksReducer;
