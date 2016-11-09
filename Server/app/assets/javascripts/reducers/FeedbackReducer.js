import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import _ from 'underscore';
import Immutable from 'immutable';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_CHANGE_FEEDBACK_DATA:
            var form = Object.assign({}, state.form);
            form[action.name] = action.value;
            return Object.assign({}, state, {
                form: form
            });
        case ActionTypes.TYPE_CLEAN_FEEDBACK_DATA:
            return Object.assign({}, state, {
                form: null,
                isFetching: false
            });
        case ActionTypes.TYPE_SEND_FEEDBACK_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_SEND_FEEDBACK_SUCCESS:
            return Object.assign({}, state, {
                form: null,
                isFetching: false
            });
        case ActionTypes.TYPE_SEND_FEEDBACK_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}