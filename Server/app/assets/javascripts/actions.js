export const TYPE_FETCH_PROFILE_REQUEST = 'TYPE_FETCH_PROFILE_REQUEST';
export const TYPE_FETCH_PROFILE_SUCCESS = 'TYPE_FETCH_PROFILE_SUCCESS';
export const TYPE_FETCH_PROFILE_FAILURE = 'TYPE_FETCH_PROFILE_FAILURE';
export const TYPE_CHANGE_PROFILE = 'TYPE_CHANGE_PROFILE';
export const TYPE_CHANGE_CANCEL_PROFILE = 'TYPE_CHANGE_CANCEL_PROFILE';
export const TYPE_SAVE_PROFILE_REQUEST = 'TYPE_SAVE_PROFILE_REQUEST';
export const TYPE_SAVE_PROFILE_SUCCESS = 'TYPE_SAVE_PROFILE_SUCCESS';
export const TYPE_SAVE_PROFILE_FAILURE = 'TYPE_SAVE_PROFILE_FAILURE';

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

export function fetchProfileFailure(err){
    const action = {
        type: TYPE_FETCH_PROFILE_FAILURE,
        err: err
    };
    return action;
}

export function changeProfile(fieldName, value){
    const action = {
        type: TYPE_CHANGE_PROFILE,
        fieldName: fieldName,
        value: value
    }
    return action;
}

export function changeCancelProfile(){
    const action = {
        type: TYPE_CHANGE_CANCEL_PROFILE
    }
    return action;
}

export function saveProfileRequest(){
    const action = {
        type: TYPE_SAVE_PROFILE_REQUEST
    }
    return action;
}

export function saveProfileSuccess(response){
    const action = {
        type: TYPE_SAVE_PROFILE_SUCCESS,
        response: response
    }
    return action;
}

export function saveProfileFailure(err){
    const action = {
        type: TYPE_SAVE_PROFILE_FAILURE,
        err: err
    }
    return action;
}