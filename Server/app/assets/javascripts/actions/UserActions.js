import {
    TYPE_FETCH_USER_REQUEST,
    TYPE_FETCH_USER_SUCCESS,
    TYPE_FETCH_USER_FAILURE
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
