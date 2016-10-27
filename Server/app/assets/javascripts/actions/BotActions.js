import {
    TYPE_CREATE_BOT_REQUEST,
    TYPE_CREATE_BOT_SUCCESS,
    TYPE_CREATE_BOT_FAILURE,
    TYPE_DELETE_BOT_REQUEST,
    TYPE_DELETE_BOT_SUCCESS,
    TYPE_DELETE_BOT_FAILURE,
    TYPE_UPDATE_BOT_REQUEST,
    TYPE_UPDATE_BOT_SUCCESS,
    TYPE_UPDATE_BOT_FAILURE,
    TYPE_FETCH_BOT_REQUEST,
    TYPE_FETCH_BOT_SUCCESS,
    TYPE_FETCH_BOT_FAILURE,
    TYPE_CONNECT_BOT_REQUEST,
    TYPE_CONNECT_BOT_SUCCESS,
    TYPE_CONNECT_BOT_FAILURE,
    TYPE_CHANGE_BOT_DATA,
    TYPE_RESET_BOT_DATA,
    TYPE_CHANGE_NEW_BOT_DATA,
    TYPE_CLEAN_NEW_BOT_DATA
} from './ActionTypes';

import {fetchBots} from './BotsActions';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function createBotRequest(){
    const action = {
        type: TYPE_CREATE_BOT_REQUEST
    };
    return action;
}

export function createBotSuccess(response){
    const action = {
        type: TYPE_CREATE_BOT_SUCCESS,
        response: response
    };
    return action;
}

export function createBotFailure(){
    const action = {
        type: TYPE_CREATE_BOT_FAILURE
    };
    return action;
}

export function createBot(callback){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.bot.form == undefined){
            return Promise.resolve();
        }
        dispatch(createBotRequest());
        return Utils.post('/api/v1/private/bots', rootState.bot.form).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(createBotSuccess(data));
                dispatch(showToast(
                    'success', 'Create Bot', `Bot ${rootState.bot.form.name} has been created.`
                ));
                dispatch(fetchBots(true));
                if(callback != undefined){
                    callback(data);
                }
            } else {
                dispatch(createBotFailure());
                dispatch(showToast(
                    'error', 'Create Bot', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(createBotFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}

export function removeBotRequest(){
    const action = {
        type: TYPE_DELETE_BOT_REQUEST
    };
    return action;
}

export function removeBotSuccess(id){
    const action = {
        type: TYPE_DELETE_BOT_SUCCESS,
        id: id
    };
    return action;
}

export function removeBotFailure(){
    const action = {
        type: TYPE_DELETE_BOT_FAILURE
    };
    return action;
}

export function removeBot(id){
    return function(dispatch, getState){
        dispatch(removeBotRequest());
        return Utils.del(`/api/v1/private/bots/${id}`).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(removeBotSuccess(id));
                let name = data['name'];
                dispatch(showToast(
                    'success', 'Delete Bot', `Bot ${name} has been removed.`
                ));
                dispatch(fetchBots(true));
            } else {
                dispatch(removeBotFailure());
                dispatch(showToast(
                    'error', 'Delete Bot', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(removeBotFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}

export function updateBotRequest(){
    const action = {
        type: TYPE_UPDATE_BOT_REQUEST
    };
    return action;
}

export function updateBotSuccess(response){
    const action = {
        type: TYPE_UPDATE_BOT_SUCCESS,
        response: response
    };
    return action;
}

export function updateBotFailure(){
    const action = {
        type: TYPE_UPDATE_BOT_FAILURE
    };
    return action;
}

export function updateBot(id){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.bot.items == undefined){
            return Promise.resolve();
        }
        let item = rootState.bot.items[id];
        if(item == undefined){
            return Promise.resolve();
        }
        let bot = item.data;
        if(bot == undefined){
            return Promise.resolve();
        }
        dispatch(updateBotRequest());
        return Utils.put(`/api/v1/private/bots/${id}`, bot).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(updateBotSuccess(data));
                dispatch(showToast(
                    'success', 'Update Bot', `Bot ${bot.name} has been updated.`
                ));
                dispatch(fetchBots(false));
            } else {
                dispatch(updateBotFailure());
                dispatch(showToast(
                    'error', 'Update Bot', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(updateBotFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
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

export function fetchBotFailure(){
    const action = {
        type: TYPE_FETCH_BOT_FAILURE
    };
    return action;
}

export function fetchBot(id){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.bot.items != undefined){
            let item = rootState.bot.items[id];
            if(item != undefined && item.recentCreated){
                return Promise.resolve();
            }
        }
        dispatch(fetchBotRequest());
        return Utils.get(`/api/v1/private/bots/${id}`).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(fetchBotSuccess(data));
            } else {
                dispatch(fetchBotFailure());
                dispatch(showToast(
                    'error', 'Fetch Bot', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(fetchBotFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}

export function connectBotRequest(){
    const action = {
        type: TYPE_CONNECT_BOT_REQUEST
    };
    return action;
}

export function connectBotSuccess(response){
    const action = {
        type: TYPE_CONNECT_BOT_SUCCESS,
        response: response
    };
    return action;
}

export function connectBotFailure(){
    const action = {
        type: TYPE_CONNECT_BOT_FAILURE
    };
    return action;
}

export function connectBot(appid, appsecret){
    return function(dispatch){
        dispatch(connectBotRequest());
        return Utils.post('/api/v1/private/bots/connect', {
            ms_appid: appid,
            ms_appsecret: appsecret
        }).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            let state = data['state'];
            if(err == undefined || err.trim().length === 0){
                if(state != undefined && state === 1){
                    dispatch(connectBotSuccess(data));
                    dispatch(showToast(
                        'success', 'Connect Microsoft Account', 'Connected'
                    ));
                } else {
                    dispatch(connectBotFailure());
                    dispatch(showToast(
                        'error', 'Connect Microsoft Account', 'Validation failed.'
                    ));
                }
            } else {
                dispatch(connectBotFailure());
                dispatch(showToast(
                    'error', 'Connect Microsoft Account', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(connectBotFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}

export function changeBotData(id, name, value){
    const action = {
        type: TYPE_CHANGE_BOT_DATA,
        id: id,
        name: name,
        value: value
    };
    return action;
}

export function resetBotData(id){
    const action = {
        type: TYPE_RESET_BOT_DATA,
        id: id
    };
    return action;
}

export function changeNewBotData(name, value){
    const action = {
        type: TYPE_CHANGE_NEW_BOT_DATA,
        name: name,
        value: value
    };
    return action;
}

export function cleanNewBotData(){
    const action = {
        type: TYPE_CLEAN_NEW_BOT_DATA
    };
    return action;
}
