import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_SHOW_MODAL:
            return Object.assign({}, state, {
                show: true,
                type: action.toastType,
                title: action.title,
                body: action.body
            });
        case ActionTypes.TYPE_SHOW_MODAL_FINISH:
            return { show: false };
        default:
            return state;
    }
}