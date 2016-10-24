import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_SHOW_MODAL:
            return Object.assign({}, state, {
                show: true,
                title: action.title,
                body: action.body,
                handleMethod: action.handleMethod,
                relatedTarget: action.relatedTarget
            });
        case ActionTypes.TYPE_SHOW_MODAL_FINISH:
            return Object.assign({}, state, {
                show: false
            });
        default:
            return state;
    }
}