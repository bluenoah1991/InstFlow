import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_FETCH_BOTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_BOTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.response,
                response: action.response
            });
        case ActionTypes.TYPE_FETCH_BOTS_FAILURE:
            return { isFetching: false };
        case ActionTypes.TYPE_CHANGE_CURRENT_BOT:
            return Object.assign({}, state, {
                currentBot: action.bot
            });
        default:
            return state;
    }
}