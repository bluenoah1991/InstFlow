import {
    TYPE_CHANGE_HYPERLINK_MESSAGE_DATA,
    TYPE_CLEAN_HYPERLINK_MESSAGE_DATA,
    TYPE_CREATE_HYPERLINK_MESSAGE_REQUEST,
    TYPE_CREATE_HYPERLINK_MESSAGE_SUCCESS,
    TYPE_CREATE_HYPERLINK_MESSAGE_FAILURE
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function changeHyperlinkMessageData(name, value){
    const action = {
        type: TYPE_CHANGE_HYPERLINK_MESSAGE_DATA,
        name: name,
        value: value
    };
    return action;
}

export function cleanHyperlinkMessageData(){
    const action = {
        type: TYPE_CLEAN_HYPERLINK_MESSAGE_DATA
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

export function createHyperlinkMessage(){
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