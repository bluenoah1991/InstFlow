import {
    TYPE_FETCH_RECENT_CONVS_REQUEST,
    TYPE_FETCH_RECENT_CONVS_SUCCESS,
    TYPE_FETCH_RECENT_CONVS_FAILURE
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
                    callback(channel_id, user_client_id);
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
