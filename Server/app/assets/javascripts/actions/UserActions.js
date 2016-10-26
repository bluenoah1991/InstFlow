import {
    TYPE_FETCH_USER_REQUEST,
    TYPE_FETCH_USER_SUCCESS,
    TYPE_FETCH_USER_FAILURE,
    TYPE_CHANGE_DIRECT_MESSAGE_DATA,
    TYPE_CLEAN_DIRECT_MESSAGE_DATA,
    TYPE_SEND_DIRECT_MESSAGE,
    TYPE_SEND_DIRECT_MESSAGE_FINISH
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function fetchUserRequest(){
    const action = {
        type: TYPE_FETCH_USER_REQUEST
    };
    return action;
}

export function fetchUserSuccess(response){
    const action = {
        type: TYPE_FETCH_USER_SUCCESS,
        response: response
    };
    return action;
}

export function fetchUserFailure(){
    const action = {
        type: TYPE_FETCH_USER_FAILURE
    };
    return action;
}

export function fetchUser(id){
    return function(dispatch){
        dispatch(fetchUserRequest());
        return Utils.get(`/api/v1/private/users/${id}`).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(fetchUserSuccess(data));
            } else {
                dispatch(fetchUserFailure());
                if(showToast){
                    dispatch(showToast(
                        'error', 'Fetch User', data['message'] != undefined ? data['message'] : err
                    ));
                }
            }
        }).catch(function(err){
            dispatch(fetchUserFailure());
            if(showToast){
                dispatch(showToast(
                    'error', 'Bad Request', err.toString()
                ));
            }
        });
    }
}

export function changeDirectMessageData(message){
    const action = {
        type: TYPE_CHANGE_DIRECT_MESSAGE_DATA,
        message: message
    };
    return action;
}

export function cleanDirectMessageData(){
    const action = {
        type: TYPE_CLEAN_DIRECT_MESSAGE_DATA
    };
    return action;
}

export function sendDirectMessageRequest(){
    const action = {
        type: TYPE_SEND_DIRECT_MESSAGE
    };
    return action;
}

export function sendDirectMessageFinish(){
    const action = {
        type: TYPE_SEND_DIRECT_MESSAGE_FINISH
    };
    return action;
}

export function sendDirectMessage(id){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.user.directMessage == undefined || rootState.user.directMessage.length === 0){
            return Promise.resolve();
        }
        dispatch(sendDirectMessageRequest());
        return Utils.post(`/api/v1/private/send/${id}`, {
            message: rootState.user.directMessage
        }).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            dispatch(sendDirectMessageFinish());
            if(err == undefined || err.trim().length === 0){
                dispatch(showToast(
                    'success', 'Send Message', 'Send success!'
                ));
            } else {
                dispatch(showToast(
                    'error', 'Send Message', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(sendDirectMessageFinish());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}