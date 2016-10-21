import {combineReducers} from 'redux';
import {
    TYPE_SHOW_TOAST,
    TYPE_SHOW_TOAST_FINISH
} from '../actions';

export default function(state={}, action){
    switch(action.type){
        case TYPE_SHOW_TOAST:
            return Object.assign({}, state, {
                showToast: true,
                toastMethod: action.method,
                toastTitle: action.title,
                toastMessage: action.message
            });
        case TYPE_SHOW_TOAST_FINISH:
            return Object.assign({}, state, {
                showToast: false
            });
        default:
            return state;
    }
}