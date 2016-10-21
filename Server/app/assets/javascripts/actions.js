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

// Bot Create Action Types
export const TYPE_BOT_CREATE_REQUEST = 'TYPE_BOT_CREATE_REQUEST';
export const TYPE_BOT_CREATE_SUCCESS = 'TYPE_BOT_CREATE_SUCCESS';
export const TYPE_BOT_CREATE_FAILURE = 'TYPE_BOT_CREATE_FAILURE';
export const TYPE_CHANGE_BOT_CREATE_FORM = 'TYPE_CHANGE_BOT_CREATE_FORM';
export const TYPE_CHANGE_CANCEL_BOT_CREATE = 'TYPE_CHANGE_CANCEL_BOT_CREATE';


// Bot Create Actions
export function createBotRequest(){
    const action = {
        type: TYPE_BOT_CREATE_REQUEST
    }
    return action;
}

export function createBotSuccess(response){
    const action = {
        type: TYPE_BOT_CREATE_SUCCESS,
        response: response
    }
    return action;
}

export function createBotFailure(err){
    const action = {
        type: TYPE_BOT_CREATE_FAILURE,
        err: err
    }
    return action;
}

export function changeBotCreateForm(fieldName, value){
    const action = {
        type: TYPE_CHANGE_BOT_CREATE_FORM,
        fieldName: fieldName,
        value: value
    }
    return action;
}

export function changeCancelBotCreate(){
    const action = {
        type: TYPE_CHANGE_CANCEL_BOT_CREATE
    }
    return action;
}

// Bot Action Types
export const TYPE_FETCH_BOT_REQUEST = 'TYPE_FETCH_BOT_REQUEST';
export const TYPE_FETCH_BOT_SUCCESS = 'TYPE_FETCH_BOT_SUCCESS';
export const TYPE_FETCH_BOT_FAILURE = 'TYPE_FETCH_BOT_FAILURE';
export const TYPE_SAVE_BOT_REQUEST = 'TYPE_SAVE_BOT_REQUEST';
export const TYPE_SAVE_BOT_SUCCESS = 'TYPE_SAVE_BOT_SUCCESS';
export const TYPE_SAVE_BOT_FAILURE = 'TYPE_SAVE_BOT_FAILURE';
export const TYPE_CHANGE_BOT_FORM = 'TYPE_CHANGE_BOT_FORM';
export const TYPE_CHANGE_CANCEL_BOT = 'TYPE_CHANGE_CANCEL_BOT';
export const TYPE_CLEAN_BOT_FORM = 'TYPE_CLEAN_BOT_FORM';
export const TYPE_FETCH_BOTS_REQUEST = 'TYPE_FETCH_BOTS_REQUEST';
export const TYPE_FETCH_BOTS_SUCCESS = 'TYPE_FETCH_BOTS_SUCCESS';
export const TYPE_FETCH_BOTS_FAILURE = 'TYPE_FETCH_BOTS_FAILURE';
export const TYPE_OPEN_RECENT_CRAETED_BOT = 'TYPE_OPEN_RECENT_CRAETED_BOT';
export const TYPE_DELETE_BOT_REQUEST = 'TYPE_DELETE_BOT_REQUEST';
export const TYPE_DELETE_BOT_SUCCESS = 'TYPE_DELETE_BOT_SUCCESS';
export const TYPE_DELETE_BOT_FAILURE = 'TYPE_DELETE_BOT_FAILURE';
export const TYPE_CONNECT_MS_REQUEST = 'TYPE_CONNECT_MS_REQUEST';
export const TYPE_CONNECT_MS_SUCCESS = 'TYPE_CONNECT_MS_SUCCESS';
export const TYPE_CONNECT_MS_FAILURE = 'TYPE_CONNECT_MS_FAILURE';

// Bot Actions
export function fetchBotsRequest(){
    const action = {
        type: TYPE_FETCH_BOTS_REQUEST
    };
    return action;
}

export function fetchBotsSuccess(response){
    const action = {
        type: TYPE_FETCH_BOTS_SUCCESS,
        response: response
    };
    return action;
}

export function fetchBotsFailure(err){
    const action = {
        type: TYPE_FETCH_BOTS_FAILURE,
        err: err
    };
    return action;
}

export function fetchBotRequest(){
    const action = {
        type: TYPE_FETCH_BOT_REQUEST
    };
    return action;
}

export function fetchBotSuccess(response){
    const action = {
        type: TYPE_FETCH_BOT_SUCCESS,
        response: response
    };
    return action;
}

export function fetchBotFailure(err){
    const action = {
        type: TYPE_FETCH_BOT_FAILURE,
        err: err
    };
    return action;
}

export function saveBotRequest(){
    const action = {
        type: TYPE_SAVE_BOT_REQUEST
    }
    return action;
}

export function saveBotSuccess(response){
    const action = {
        type: TYPE_SAVE_BOT_SUCCESS,
        response: response
    }
    return action;
}

export function saveBotFailure(err){
    const action = {
        type: TYPE_SAVE_BOT_FAILURE,
        err: err
    }
    return action;
}

export function changeBotForm(fieldName, value){
    const action = {
        type: TYPE_CHANGE_BOT_FORM,
        fieldName: fieldName,
        value: value
    }
    return action;
}

export function changeCancelBot(){
    const action = {
        type: TYPE_CHANGE_CANCEL_BOT
    }
    return action;
}

export function cleanBotForm(){
    const action = {
        type: TYPE_CLEAN_BOT_FORM
    }
    return action;
}

export function openRecentCreatedBot(){
    const action = {
        type: TYPE_OPEN_RECENT_CRAETED_BOT
    }
    return action;
}

export function deleteBotRequest(){
    const action = {
        type: TYPE_DELETE_BOT_REQUEST
    };
    return action;
}

export function deleteBotSuccess(response){
    const action = {
        type: TYPE_DELETE_BOT_SUCCESS,
        response: response
    };
    return action;
}

export function deleteBotFailure(err){
    const action = {
        type: TYPE_DELETE_BOT_FAILURE,
        err: err
    };
    return action;
}

export function connectMSRequest(){
    const action = {
        type: TYPE_CONNECT_MS_REQUEST
    };
    return action;
}

export function connectMSSuccess(response){
    const action = {
        type: TYPE_CONNECT_MS_SUCCESS,
        response: response
    };
    return action;
}

export function connectMSFailure(err){
    const action = {
        type: TYPE_CONNECT_MS_FAILURE,
        err: err
    };
    return action;
}

// Modal Action Types
export const TYPE_SHOW_MODAL = 'TYPE_SHOW_MODAL';
export const TYPE_SHOW_MODAL_FINISH = 'TYPE_SHOW_MODAL_FINISH';


// Modal Actions
export function showModal(title, body, handleEvent, relatedTarget){
    const action = {
        type: TYPE_SHOW_MODAL,
        title: title,
        body: body,
        handleEvent: handleEvent,
        relatedTarget: relatedTarget
    }
    return action;
}

export function showModalFinish(){
    const action = {
        type: TYPE_SHOW_MODAL_FINISH
    }
    return action;
}

// User Action Types
export const TYPE_FETCH_USER_REQUEST = 'TYPE_FETCH_USER_REQUEST';
export const TYPE_FETCH_USER_SUCCESS = 'TYPE_FETCH_USER_SUCCESS';
export const TYPE_FETCH_USER_FAILURE = 'TYPE_FETCH_USER_FAILURE';

// User Actions
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

export function fetchUserFailure(err){
    const action = {
        type: TYPE_FETCH_USER_FAILURE,
        err: err
    };
    return action;
}

// Global Action Types
export const TYPE_CHANGE_USERNAME = 'TYPE_CHANGE_USERNAME';
export const TYPE_CHANGE_CURRENT_BOT = 'TYPE_CHANGE_CURRENT_BOT';

// Global Actions
export function changeUserName(username){
    const action = {
        type: TYPE_CHANGE_USERNAME,
        username: username
    }
    return action;
}

export function changeCurrentBot(bot){
    const action = {
        type: TYPE_CHANGE_CURRENT_BOT,
        bot: bot
    }
    return action;
}