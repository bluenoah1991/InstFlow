import {
    TYPE_FETCH_RECENT_CONVS_REQUEST,
    TYPE_FETCH_RECENT_CONVS_SUCCESS,
    TYPE_FETCH_RECENT_CONVS_FAILURE,
    TYPE_UPDATE_RECENT_CONVS_SUCCESS,
    TYPE_SET_UPDATE_RECENT_CONVS,
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
    return function(dispatch, getState){
        dispatch(fetchRecentConvsRequest());
        let rootState = getState();
        let time = rootState.convs.latestTime;
        return Utils.post('/api/v1/private/convs/recent', {
            channel_id: channel_id,
            user_client_id: user_client_id,
            time: time
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
        }).then(function(){
            let id = window.setTimeout(function(){
                dispatch(updateRecentConvs());
            }, 2000);
            dispatch(setUpdateRecentConvs(id));
        }).catch(function(err){
            dispatch(fetchRecentConvsFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
            let id = window.setTimeout(function(){
                dispatch(updateRecentConvs());
            }, 2000);
            dispatch(setUpdateRecentConvs(id));
        });
    }
}

export function setUpdateRecentConvs(id){
    const action = {
        type: TYPE_SET_UPDATE_RECENT_CONVS,
        id: id
    };
    return action;
}

export function updateRecentConvsSuccess(channel_id, user_client_id, to, response){
    const action = {
        type: TYPE_UPDATE_RECENT_CONVS_SUCCESS,
        channel_id: channel_id,
        user_client_id: user_client_id,
        to: to,
        response: response
    };
    return action;
}

export function updateRecentConvs(){
    return function(dispatch, getState){
        let rootState = getState();
        let channel_id = rootState.convs.channelId;
        let user_client_id = rootState.convs.userClientId;
        let to = rootState.convs.to;
        let time = rootState.convs.latestTime;
        return Utils.post('/api/v1/private/convs/recent', {
            channel_id: channel_id,
            user_client_id: user_client_id,
            time: time
        }).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(updateRecentConvsSuccess(channel_id, user_client_id, to, data));
            }
        }).then(function(){
            window.setTimeout(function(){
                dispatch(updateRecentConvs());
            }, 2000);
        }).catch(function(err){
            window.setTimeout(function(){
                dispatch(updateRecentConvs());
            }, 2000);
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
