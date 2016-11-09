import {
    TYPE_CHANGE_FEEDBACK_DATA,
    TYPE_CLEAN_FEEDBACK_DATA,
    TYPE_SEND_FEEDBACK_REQUEST,
    TYPE_SEND_FEEDBACK_SUCCESS,
    TYPE_SEND_FEEDBACK_FAILURE
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function changeFeedbackData(name, value){
    const action = {
        type: TYPE_CHANGE_FEEDBACK_DATA,
        name: name,
        value: value
    };
    return action;
}

export function cleanFeedbackData(){
    const action = {
        type: TYPE_CLEAN_FEEDBACK_DATA
    };
    return action;
}

export function sendFeedbackRequest(){
    const action = {
        type: TYPE_SEND_FEEDBACK_REQUEST
    };
    return action;
}

export function sendFeedbackSuccess(response){
    const action = {
        type: TYPE_SEND_FEEDBACK_SUCCESS,
        response: response
    };
    return action;
}

export function sendFeedbackFailure(){
    const action = {
        type: TYPE_SEND_FEEDBACK_FAILURE
    };
    return action;
}

export function sendFeedback(){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.feedback.form == undefined){
            return Promise.resolve();
        }
        dispatch(sendFeedbackRequest());
        return Utils.post('/api/v1/private/feedback', rootState.feedback.form).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(sendFeedbackSuccess(data));
                dispatch(showToast(
                    'success', 'Send feedback', 'Send successfully'
                ));
            } else {
                dispatch(sendFeedbackFailure());
                dispatch(showToast(
                    'error', 'Send feedback', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(sendFeedbackFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}