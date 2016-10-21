import {
    TYPE_FETCH_PROFILE_REQUEST,
    TYPE_FETCH_PROFILE_SUCCESS,
    TYPE_FETCH_PROFILE_FAILURE,
    TYPE_CHANGE_PROFILE_DATA,
    TYPE_RESET_PROFILE_DATA,
    TYPE_UPDATE_PROFILE_REQUEST,
    TYPE_UPDATE_PROFILE_SUCCESS,
    TYPE_UPDATE_PROFILE_FAILURE
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function fetchProfileRequest(){
    const action = {
        type: TYPE_FETCH_PROFILE_REQUEST
    };
    return action;
}

export function fetchProfileSuccess(response){
    const action = {
        type: TYPE_FETCH_PROFILE_SUCCESS,
        response: response
    };
    return action;
}

export function fetchProfileFailure(){
    const action = {
        type: TYPE_FETCH_PROFILE_FAILURE
    };
    return action;
}

export function fetchProfile(){
    return function(dispatch){
        dispatch(fetchProfileRequest());
        return Utils.get('/api/v1/private/profile').then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(fetchProfileSuccess(data));
            } else {
                dispatch(fetchProfileFailure());
                dispatch(showToast(
                    'error', 'Fetch Profile', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(fetchProfileFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}

export function changeProfileData(name, value){
    const action = {
        type: TYPE_CHANGE_PROFILE_DATA,
        name: name,
        value: value
    };
    return action;
}

export function resetProfileData(){
    const action = {
        type: TYPE_RESET_PROFILE_DATA
    };
    return action;
}

export function updateProfileRequest(){
    const action = {
        type: TYPE_UPDATE_PROFILE_REQUEST
    };
    return action;
}

export function updateProfileSuccess(response){
    const action = {
        type: TYPE_UPDATE_PROFILE_SUCCESS,
        response: response
    };
    return action;
}

export function updateProfileFailure(){
    const action = {
        type: TYPE_UPDATE_PROFILE_FAILURE
    };
    return action;
}

export function updateProfile(){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.profile.data == undefined){
            return Promise.resolve();
        }
        dispatch(updateProfileRequest());
        return Utils.post('/api/v1/private/profile', rootState.profile.data).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(updateProfileSuccess(data));
                dispatch(showToast(
                    'success', 'Update Profile', 'Your account has been updated successfully!'
                ));
            } else {
                dispatch(updateProfileFailure());
                dispatch(showToast(
                    'error', 'Update Profile', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(updateProfileFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}
