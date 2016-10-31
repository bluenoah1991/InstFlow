import {
    TYPE_CHANGE_NEW_HYPERLINK_MESSAGE_DATA,
    TYPE_CLEAN_NEW_HYPERLINK_MESSAGE_DATA,
    TYPE_CREATE_HYPERLINK_MESSAGE_REQUEST,
    TYPE_CREATE_HYPERLINK_MESSAGE_SUCCESS,
    TYPE_CREATE_HYPERLINK_MESSAGE_FAILURE,
    TYPE_UPDATE_HYPERLINK_MESSAGE_REQUEST,
    TYPE_UPDATE_HYPERLINK_MESSAGE_SUCCESS,
    TYPE_UPDATE_HYPERLINK_MESSAGE_FAILURE,
    TYPE_FETCH_HYPERLINK_MESSAGE_REQUEST,
    TYPE_FETCH_HYPERLINK_MESSAGE_SUCCESS,
    TYPE_FETCH_HYPERLINK_MESSAGE_FAILURE,
    TYPE_CHANGE_HYPERLINK_MESSAGE_DATA,
    TYPE_RESET_HYPERLINK_MESSAGE_DATA
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function changeNewHyperlinkMessageData(name, value){
    const action = {
        type: TYPE_CHANGE_NEW_HYPERLINK_MESSAGE_DATA,
        name: name,
        value: value
    };
    return action;
}

export function cleanNewHyperlinkMessageData(){
    const action = {
        type: TYPE_CLEAN_NEW_HYPERLINK_MESSAGE_DATA
    };
    return action;
}

export function changeHyperlinkMessageData(id, name, value){
    const action = {
        type: TYPE_CHANGE_HYPERLINK_MESSAGE_DATA,
        id: id,
        name: name,
        value: value
    };
    return action;
}

export function resetHyperlinkMessageData(id){
    const action = {
        type: TYPE_RESET_HYPERLINK_MESSAGE_DATA,
        id: id
    };
    return action;
}

export function createHyperlinkMessageRequest(){
    const action = {
        type: TYPE_CREATE_HYPERLINK_MESSAGE_REQUEST
    };
    return action;
}

export function createHyperlinkMessageSuccess(){
    const action = {
        type: TYPE_CREATE_HYPERLINK_MESSAGE_SUCCESS
    };
    return action;
}

export function createHyperlinkMessageFailure(){
    const action = {
        type: TYPE_CREATE_HYPERLINK_MESSAGE_FAILURE
    };
    return action;
}

export function createHyperlinkMessage(callback){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.hyperlinkMessage.form == undefined){
            return Promise.resolve();
        }
        let currentBot = rootState.bots.currentBot;
        if(currentBot == undefined){
            return Promise.resolve();
        }
        dispatch(createHyperlinkMessageRequest());
        return Utils.post('/api/v1/private/hyperlink_messages', 
            Object.assign({}, rootState.hyperlinkMessage.form, {bot_id: currentBot.id})).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(createHyperlinkMessageSuccess(data));
                dispatch(showToast(
                    'success', 'Create Hyperlink Message', `Hyperlink Message ${rootState.hyperlinkMessage.form.title} has been created.`
                ));
                if(callback){
                    callback(data);
                }
            } else {
                dispatch(createHyperlinkMessageFailure());
                dispatch(showToast(
                    'error', 'Create Hyperlink Message', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(createHyperlinkMessageFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}

export function updateHyperlinkMessageRequest(){
    const action = {
        type: TYPE_UPDATE_HYPERLINK_MESSAGE_REQUEST
    };
    return action;
}

export function updateHyperlinkMessageSuccess(response){
    const action = {
        type: TYPE_UPDATE_HYPERLINK_MESSAGE_SUCCESS,
        response: response
    };
    return action;
}

export function updateHyperlinkMessageFailure(){
    const action = {
        type: TYPE_UPDATE_HYPERLINK_MESSAGE_FAILURE
    };
    return action;
}

export function updateHyperlinkMessage(id, callback){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.hyperlinkMessage.items == undefined){
            return Promise.resolve();
        }
        let item = rootState.hyperlinkMessage.items[id];
        if(item == undefined){
            return Promise.resolve();
        }
        let hyperlinkMessage = item.data;
        if(hyperlinkMessage == undefined){
            return Promise.resolve();
        }
        dispatch(updateHyperlinkMessageRequest());
        return Utils.put(`/api/v1/private/hyperlink_messages/${id}`, hyperlinkMessage).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(updateHyperlinkMessageSuccess(data));
                dispatch(showToast(
                    'success', 'Update Hyperlink Message', `HyperlinkMessage has been updated.`
                ));
                if(callback){
                    callback(data);
                }
            } else {
                dispatch(updateHyperlinkMessageFailure());
                dispatch(showToast(
                    'error', 'Update Hyperlink Message', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(updateHyperlinkMessageFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}

export function fetchHyperlinkMessageRequest(){
    const action = {
        type: TYPE_FETCH_HYPERLINK_MESSAGE_REQUEST
    };
    return action;
}

export function fetchHyperlinkMessageSuccess(response){
    const action = {
        type: TYPE_FETCH_HYPERLINK_MESSAGE_SUCCESS,
        response: response
    };
    return action;
}

export function fetchHyperlinkMessageFailure(){
    const action = {
        type: TYPE_FETCH_HYPERLINK_MESSAGE_FAILURE
    };
    return action;
}

export function fetchHyperlinkMessage(id){
    return function(dispatch, getState){
        dispatch(fetchHyperlinkMessageRequest());
        return Utils.get(`/api/v1/private/hyperlink_messages/${id}`).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(fetchHyperlinkMessageSuccess(data));
            } else {
                dispatch(fetchHyperlinkMessageFailure());
                dispatch(showToast(
                    'error', 'Fetch Hyperlink Message', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(fetchHyperlinkMessageFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}
