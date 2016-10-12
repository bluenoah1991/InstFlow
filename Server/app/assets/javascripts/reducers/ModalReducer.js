import {combineReducers} from 'redux';
import {
    TYPE_SHOW_MODAL,
    TYPE_SHOW_MODAL_FINISH
} from '../actions';

export default function(state={}, action){
    switch(action.type){
        case TYPE_SHOW_MODAL:
            return Object.assign({}, state, {
                show: true,
                title: action.title,
                body: action.body,
                handleEvent: action.handleEvent
            });
        case TYPE_SHOW_MODAL_FINISH:
            return Object.assign({}, state, {
                show: false
            });
        default:
            return state;
    }
}