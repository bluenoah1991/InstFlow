import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_SHOW_TOAST:
            return Object.assign({}, state, {
                show: true,
                type: action.toastType,
                title: action.title,
                body: action.body
            });
        case ActionTypes.TYPE_SHOW_TOAST_FINISH:
            return Object.assign({}, state, {
                show: false
            });
        default:
            return state;
    }
}