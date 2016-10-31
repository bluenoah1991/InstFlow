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
        case ActionTypes.TYPE_CHANGE_NEW_HYPERLINK_MESSAGE_DATA:
            var form = Object.assign({}, state.form);
            form[action.name] = action.value;
            return Object.assign({}, state, {
                form: form
            });
        case ActionTypes.TYPE_CLEAN_NEW_HYPERLINK_MESSAGE_DATA:
            return Object.assign({}, state, {
                form: null
            });
        case ActionTypes.TYPE_CHANGE_HYPERLINK_MESSAGE_DATA:
            if(state.items == undefined){
                return state;
            }
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.updateIn([action.id, 'data'], function(item){
                if(item != undefined){
                    item = item.set(action.name, action.value);
                }
                return item;
            });
            return Object.assign({}, state, {
                items: items.toJS()
            });
        case ActionTypes.TYPE_RESET_HYPERLINK_MESSAGE_DATA:
            if(state.items == undefined){
                return state;
            }
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.updateIn([action.id], function(item){
                if(item != undefined){
                    item = item.set('data', item.response);
                }
                return item;
            });
            return Object.assign({}, state, {
                items: items.toJS()
            });
        case ActionTypes.TYPE_UPDATE_HYPERLINK_MESSAGE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_UPDATE_HYPERLINK_MESSAGE_SUCCESS:
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.setIn([action.response.id], {
                data: action.response,
                response: action.response
            });
            return Object.assign({}, state, {
                isFetching: false,
                items: items.toJS()
            });
        case ActionTypes.TYPE_UPDATE_HYPERLINK_MESSAGE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_FETCH_HYPERLINK_MESSAGE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_HYPERLINK_MESSAGE_SUCCESS:
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.setIn([action.response.id], {
                data: action.response,
                response: action.response
            });
            return Object.assign({}, state, {
                isFetching: false,
                items: items.toJS()
            });
        case ActionTypes.TYPE_FETCH_HYPERLINK_MESSAGE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}