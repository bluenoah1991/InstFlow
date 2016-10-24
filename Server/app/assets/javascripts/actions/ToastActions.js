import {
    TYPE_SHOW_TOAST,
    TYPE_SHOW_TOAST_FINISH
} from './ActionTypes';

export function showToast(type, title, body){
    const action = {
        type: TYPE_SHOW_TOAST,
        toastType: type,
        title: title,
        body: body
    };
    return action;
}

export function showToastFinish(){
    const action = {
        type: TYPE_SHOW_TOAST_FINISH
    }
    return action;
}