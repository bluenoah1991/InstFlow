import {
    TYPE_FETCH_RECENT_CONVS_REQUEST,
    TYPE_FETCH_RECENT_CONVS_SUCCESS,
    TYPE_FETCH_RECENT_CONVS_FAILURE,
    TYPE_CHANGE_NL_MESSAGE_INPUT,
    TYPE_CLEAN_NL_MESSAGE_INPUT,
    TYPE_SEND_NL_MESSAGE_REQUEST,
    TYPE_SEND_NL_MESSAGE_SUCCESS,
    TYPE_SEND_NL_MESSAGE_FAILURE
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function fetchRecentConvsRequest(){
    const action = {
        type: TYPE_FETCH_RECENT_CONVS_REQUEST
    };
    return action;
}

export function fetchRecentConvsSuccess(channel_id, user_client_id, to, response){
    const action = {
        type: TYPE_FETCH_RECENT_CONVS_SUCCESS,
        channel_id: channel_id,
        user_client_id: user_client_id,
        to: to,
        response: response
    };
    return action;
}

export function fetchRecentConvsFailure(){
    const action = {
        type: TYPE_FETCH_RECENT_CONVS_FAILURE
    };
    return action;
}

export function fetchRecentConvs(channel_id, user_client_id, to, callback){
    return function(dispatch){
        dispatch(fetchRecentConvsRequest());
        return Utils.post('/api/v1/private/convs/recent', {
            channel_id: channel_id,
            user_client_id: user_client_id
        }).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(fetchRecentConvsSuccess(channel_id, user_client_id, to, data));
                if(callback != undefined){
                    callback();
                }
            } else {
                dispatch(fetchRecentConvsFailure());
                dispatch(showToast(
                    'error', 'Fetch Recent Conversations', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(fetchRecentConvsFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}

export function changeNlMessageInput(value){
    const action = {
        type: TYPE_CHANGE_NL_MESSAGE_INPUT,
        value: value
    };
    return action;
}

export function cleanNlMessageInput(){
    const action = {
        type: TYPE_CLEAN_NL_MESSAGE_INPUT
    };
    return action;
}

export function sendNlMessageRequest(){
    const action = {
        type: TYPE_SEND_NL_MESSAGE_REQUEST
    };
    return action;
}

export function sendNlMessageSuccess(response){
    const action = {
        type: TYPE_SEND_NL_MESSAGE_SUCCESS,
        response: response
    };
    return action;
}

export function sendNlMessageFailure(){
    const action = {
        type: TYPE_SEND_NL_MESSAGE_FAILURE
    };
    return action;
}

export function sendNlMessage(callback){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.convs.write == undefined || rootState.convs.write.length == 0){
            return Promise.resolve();
        }
        let currentBot = rootState.bots.currentBot;
        if(currentBot == undefined){
            return Promise.resolve();
        }
        dispatch(sendNlMessageRequest());
        return Utils.post('/api/v1/private/convs/send', {
            text: rootState.convs.write,
            bot_id: currentBot.id,
            channel_id: rootState.convs.channelId,
            user_client_id: rootState.convs.userClientId,
            conversation_id: rootState.convs.conversationId
        }).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(sendNlMessageSuccess(data));
                if(callback != undefined){
                    callback();
                }
            } else {
                dispatch(sendNlMessageFailure());
                dispatch(showToast(
                    'error', 'Send Message', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(sendNlMessageFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}
