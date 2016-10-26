import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import Immutable from 'immutable';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_FETCH_USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_USER_SUCCESS:
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.setIn([action.response.id], {
                data: action.response,
                response: action.response
            });
            return Object.assign({}, state, {
                isFetching: false,
                items: items.toJS()
            });
        case ActionTypes.TYPE_FETCH_USER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_CHANGE_DIRECT_MESSAGE_DATA:
            return Object.assign({}, state, {
                directMessage: action.message
            });
        case ActionTypes.TYPE_CLEAN_DIRECT_MESSAGE_DATA:
            return Object.assign({}, state, {
                directMessage: null
            });
        case ActionTypes.TYPE_SEND_DIRECT_MESSAGE:
            return Object.assign({}, state, {
                sendingState: 'sending'
            });
        case ActionTypes.TYPE_SEND_DIRECT_MESSAGE_FINISH:
            return Object.assign({}, state, {
                sendingState: 'init',
                directMessage: null
            });
        default:
            return state;
    }
}