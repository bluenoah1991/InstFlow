import {
    TYPE_FETCH_BOTS_REQUEST,
    TYPE_FETCH_BOTS_SUCCESS,
    TYPE_FETCH_BOTS_FAILURE,
    TYPE_CHANGE_CURRENT_BOT
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function fetchBotsRequest(){
    const action = {
        type: TYPE_FETCH_BOTS_REQUEST
    };
    return action;
}

export function fetchBotsSuccess_(response){
    const action = {
        type: TYPE_FETCH_BOTS_SUCCESS,
        response: response
    };
    return action;
}

export function fetchBotsSuccess(response){
    return function(dispatch, getState){
        dispatch(fetchBotsSuccess_(response));
        dispatch(changeCurrentBot());
    };
}

export function fetchBotsFailure(){
    const action = {
        type: TYPE_FETCH_BOTS_FAILURE
    };
    return action;
}

export function fetchBots(silence = false){
    return function(dispatch){
        dispatch(fetchBotsRequest());
        return Utils.get('/api/v1/private/bots').then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(fetchBotsSuccess(data));
            } else {
                dispatch(fetchBotsFailure());
                if(!silence){
                    dispatch(showToast(
                        'error', 'Fetch Bots', data['message'] != undefined ? data['message'] : err
                    ));
                }
            }
        }).catch(function(err){
            dispatch(fetchBotsFailure());
            if(!silence){
                dispatch(showToast(
                    'error', 'Bad Request', err.toString()
                ));
            }
        });
    }
}

export function changeCurrentBot(id){
    const action = {
        type: TYPE_CHANGE_CURRENT_BOT,
        id: id
    }
    return action;
}