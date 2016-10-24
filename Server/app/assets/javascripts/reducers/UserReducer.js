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
        default:
            return state;
    }
}