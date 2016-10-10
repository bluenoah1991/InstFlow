// Toast Action Types
export const TYPE_SHOW_TOAST = 'TYPE_SHOW_TOAST';
export const TYPE_SHOW_TOAST_FINISH = 'TYPE_SHOW_TOAST_FINISH';


// Toast Actions
export function showToast(method, title, message){
    const action = {
        type: TYPE_SHOW_TOAST,
        method: method,
        title: title,
        message: message
    };
    return action;
}

export function showToastFinish(){
    const action = {
        type: TYPE_SHOW_TOAST_FINISH
    };
    return action;
}


// Profile Action Types
export const TYPE_FETCH_PROFILE_REQUEST = 'TYPE_FETCH_PROFILE_REQUEST';
export const TYPE_FETCH_PROFILE_SUCCESS = 'TYPE_FETCH_PROFILE_SUCCESS';
export const TYPE_FETCH_PROFILE_FAILURE = 'TYPE_FETCH_PROFILE_FAILURE';
export const TYPE_CHANGE_PROFILE_FORM = 'TYPE_CHANGE_PROFILE_FORM';
export const TYPE_CHANGE_CANCEL_PROFILE = 'TYPE_CHANGE_CANCEL_PROFILE';
export const TYPE_SAVE_PROFILE_REQUEST = 'TYPE_SAVE_PROFILE_REQUEST';
export const TYPE_SAVE_PROFILE_SUCCESS = 'TYPE_SAVE_PROFILE_SUCCESS';
export const TYPE_SAVE_PROFILE_FAILURE = 'TYPE_SAVE_PROFILE_FAILURE';
export const TYPE_CHANGE_PASSWORD_FORM = 'TYPE_CHANGE_PASSWORD_FORM';
export const TYPE_CHANGE_CANCEL_PASSWORD = 'TYPE_CHANGE_CANCEL_PASSWORD';
export const TYPE_CHANGE_PASSWORD_REQUEST = 'TYPE_CHANGE_PASSWORD_REQUEST';
export const TYPE_CHANGE_PASSWORD_SUCCESS = 'TYPE_CHANGE_PASSWORD_SUCCESS';
export const TYPE_CHANGE_PASSWORD_FAILURE = 'TYPE_CHANGE_PASSWORD_FAILURE';


// Profile Actions
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

export function changeProfileForm(fieldName, value){
    const action = {
        type: TYPE_CHANGE_PROFILE_FORM,
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

export function changePasswordForm(fieldName, value){
    const action = {
        type: TYPE_CHANGE_PASSWORD_FORM,
        fieldName: fieldName,
        value: value
    }
    return action;
}

export function changeCancelPassword(){
    const action = {
        type: TYPE_CHANGE_CANCEL_PASSWORD
    }
    return action;
}

export function changePasswordRequest(){
    const action = {
        type: TYPE_CHANGE_PASSWORD_REQUEST
    }
    return action;
}

export function changePasswordSuccess(response){
    const action = {
        type: TYPE_CHANGE_PASSWORD_SUCCESS,
        response: response
    }
    return action;
}

export function changePasswordFailure(err){
    const action = {
        type: TYPE_CHANGE_PASSWORD_FAILURE,
        err: err
    }
    return action;
}

// Application Create Action Types
export const TYPE_APPLICATION_CREATE_REQUEST = 'TYPE_APPLICATION_CREATE_REQUEST';
export const TYPE_APPLICATION_CREATE_SUCCESS = 'TYPE_APPLICATION_CREATE_SUCCESS';
export const TYPE_APPLICATION_CREATE_FAILURE = 'TYPE_APPLICATION_CREATE_FAILURE';
export const TYPE_CHANGE_APPLICATION_CREATE_FORM = 'TYPE_CHANGE_APPLICATION_CREATE_FORM';
export const TYPE_CHANGE_CANCEL_APPLICATION_CREATE = 'TYPE_CHANGE_CANCEL_APPLICATION_CREATE';


// Application Create Actions
export function createApplicationRequest(){
    const action = {
        type: TYPE_APPLICATION_CREATE_REQUEST
    }
    return action;
}

export function createApplicationSuccess(response){
    const action = {
        type: TYPE_APPLICATION_CREATE_SUCCESS,
        response: response
    }
    return action;
}

export function createApplicationFailure(err){
    const action = {
        type: TYPE_APPLICATION_CREATE_FAILURE,
        err: err
    }
    return action;
}

export function changeApplicationCreateForm(fieldName, value){
    const action = {
        type: TYPE_CHANGE_APPLICATION_CREATE_FORM,
        fieldName: fieldName,
        value: value
    }
    return action;
}

export function changeCancelApplicationCreate(){
    const action = {
        type: TYPE_CHANGE_CANCEL_APPLICATION_CREATE
    }
    return action;
}

// Application Action Types
export const TYPE_FETCH_APPLICATION_REQUEST = 'TYPE_FETCH_APPLICATION_REQUEST';
export const TYPE_FETCH_APPLICATION_SUCCESS = 'TYPE_FETCH_APPLICATION_SUCCESS';
export const TYPE_FETCH_APPLICATION_FAILURE = 'TYPE_FETCH_APPLICATION_FAILURE';
export const TYPE_SAVE_APPLICATION_REQUEST = 'TYPE_SAVE_APPLICATION_REQUEST';
export const TYPE_SAVE_APPLICATION_SUCCESS = 'TYPE_SAVE_APPLICATION_SUCCESS';
export const TYPE_SAVE_APPLICATION_FAILURE = 'TYPE_SAVE_APPLICATION_FAILURE';
export const TYPE_CHANGE_APPLICATION_FORM = 'TYPE_CHANGE_APPLICATION_FORM';
export const TYPE_CHANGE_CANCEL_APPLICATION = 'TYPE_CHANGE_CANCEL_APPLICATION';


// Application Actions
export function fetchApplicationRequest(){
    const action = {
        type: TYPE_FETCH_APPLICATION_REQUEST
    };
    return action;
}

export function fetchApplicationSuccess(response){
    const action = {
        type: TYPE_FETCH_APPLICATION_SUCCESS,
        response: response
    };
    return action;
}

export function fetchApplicationFailure(err){
    const action = {
        type: TYPE_FETCH_APPLICATION_FAILURE,
        err: err
    };
    return action;
}

export function saveApplicationRequest(){
    const action = {
        type: TYPE_SAVE_APPLICATION_REQUEST
    }
    return action;
}

export function saveApplicationSuccess(response){
    const action = {
        type: TYPE_SAVE_APPLICATION_SUCCESS,
        response: response
    }
    return action;
}

export function saveApplicationFailure(err){
    const action = {
        type: TYPE_SAVE_APPLICATION_FAILURE,
        err: err
    }
    return action;
}

export function changeApplicationForm(fieldName, value){
    const action = {
        type: TYPE_CHANGE_APPLICATION_FORM,
        fieldName: fieldName,
        value: value
    }
    return action;
}

export function changeCancelApplication(){
    const action = {
        type: TYPE_CHANGE_CANCEL_APPLICATION
    }
    return action;
}
