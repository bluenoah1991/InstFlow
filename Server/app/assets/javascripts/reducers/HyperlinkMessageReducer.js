import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import _ from 'underscore';
import Immutable from 'immutable';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_CREATE_HYPERLINK_MESSAGE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_CREATE_HYPERLINK_MESSAGE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                form: null
            });
        case ActionTypes.TYPE_CREATE_HYPERLINK_MESSAGE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_CHANGE_HYPERLINK_MESSAGE_DATA:
            var form = Object.assign({}, state.form);
            form[action.name] = action.value;
            return Object.assign({}, state, {
                form: form
            });
        case ActionTypes.TYPE_CLEAN_HYPERLINK_MESSAGE_DATA:
            return Object.assign({}, state, {
                form: null
            });
        default:
            return state;
    }
}