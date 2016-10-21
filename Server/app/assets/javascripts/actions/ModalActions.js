import {
    TYPE_SHOW_MODAL,
    TYPE_SHOW_MODAL_FINISH
} from './ActionTypes';

export function showModal(title, body, handleMethod, relatedTarget){
    const action = {
        type: TYPE_SHOW_MODAL,
        title: title,
        body: body,
        handleMethod: handleMethod,
        relatedTarget: relatedTarget
    };
    return action;
}

export function showModalFinish(){
    const action = {
        type: TYPE_SHOW_MODAL_FINISH
    }
    return action;
}