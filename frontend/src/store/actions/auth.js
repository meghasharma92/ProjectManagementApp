import * as actionTypes from './actionTypes';
import axios from 'axios';
import Auth from '../../containers/Auth/Auth';

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        loading: false
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            console.log('oming in timeout')
            dispatch(authLogout());
        }, expirationTime * 1000 );
    };
};

export const authenticate = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {email: email, password: password, returnSecureToken: true}

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxJyNAuf7hnrJNZNCamHR6aAbYXuh2090";

        if(!isSignup)
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxJyNAuf7hnrJNZNCamHR6aAbYXuh2090";

        axios.post(url, authData)
        .then(res => {
            console.log(res);
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
		})
		.catch(error => {
            dispatch(authFailed(error.response.data.error));
		})
    }
}

export const authCheckState = () => {
    console.log(' coming in thissssssssssssssssssssssssss');
    console.log(localStorage.getItem('token'));
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }
        else{
            const expirationTime = new Date(localStorage.getItem('expirationDate'));
            if (expirationTime < new Date()) {
                dispatch(authLogout());
            } 
            else {
                const userId = new Date(localStorage.getItem('userId'));
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
};