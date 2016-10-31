import {
    TYPE_CHANGE_NEW_SENDING_TASK_DATA,
    TYPE_CLEAN_NEW_SENDING_TASK_DATA,
    TYPE_CREATE_SENDING_TASK_REQUEST,
    TYPE_CREATE_SENDING_TASK_SUCCESS,
    TYPE_CREATE_SENDING_TASK_FAILURE,
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function changeNewSendingTaskData(name, value){
    const action = {
        type: TYPE_CHANGE_NEW_SENDING_TASK_DATA,
        name: name,
        value: value
    };
    return action;
}

export function cleanNewSendingTaskData(){
    const action = {
        type: TYPE_CLEAN_NEW_SENDING_TASK_DATA
    };
    return action;
}

export function createSendingTaskRequest(){
    const action = {
        type: TYPE_CREATE_SENDING_TASK_REQUEST
    };
    return action;
}

export function createSendingTaskSuccess(){
    const action = {
        type: TYPE_CREATE_SENDING_TASK_SUCCESS
    };
    return action;
}

export function createSendingTaskFailure(){
    const action = {
        type: TYPE_CREATE_SENDING_TASK_FAILURE
    };
    return action;
}

export function createSendingTask(){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.sendingTask.form == undefined){
            return Promise.resolve();
        }
        let currentBot = rootState.bots.currentBot;
        if(currentBot == undefined){
            return Promise.resolve();
        }
        dispatch(createSendingTaskRequest());
        return Utils.post('/api/v1/private/send', 
            Object.assign({}, rootState.sendingTask.form, {bot_id: currentBot.id})).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(createSendingTaskSuccess(data));
                dispatch(showToast(
                    'success', 'Create Sending Task', `Task has been created.`
                ));
            } else {
                dispatch(createSendingTaskFailure());
                dispatch(showToast(
                    'error', 'Create Sending Task', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(createSendingTaskFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}
