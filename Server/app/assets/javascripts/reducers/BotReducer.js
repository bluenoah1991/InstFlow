import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import _ from 'underscore';
import Immutable from 'immutable';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_CREATE_BOT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_CREATE_BOT_SUCCESS:
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.setIn([action.response.id], {
                data: action.response,
                response: action.response,
                recentCreated: true
            });
            return Object.assign({}, state, {
                isFetching: false,
                form: null,
                items: items.toJS()
            });
        case ActionTypes.TYPE_CREATE_BOT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                form: null
            });
        case ActionTypes.TYPE_DELETE_BOT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_DELETE_BOT_SUCCESS:
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items.delete(action.id);
            return Object.assign({}, state, {
                isFetching: false,
                items: items.toJS()
            });
        case ActionTypes.TYPE_DELETE_BOT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_UPDATE_BOT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_UPDATE_BOT_SUCCESS:
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.setIn([action.response.id], {
                data: action.response,
                response: action.response,
                recentCreated: false
            });
            return Object.assign({}, state, {
                isFetching: false,
                items: items.toJS()
            });
        case ActionTypes.TYPE_UPDATE_BOT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_FETCH_BOT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_BOT_SUCCESS:
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.setIn([action.response.id], {
                data: action.response,
                response: action.response,
                recentCreated: false
            });
            var currentConnectState = 'init';
            if(action.response.connected){
                currentConnectState = 'connected';
            }
            return Object.assign({}, state, {
                isFetching: false,
                currentConnectState: currentConnectState,
                items: items.toJS()
            });
        case ActionTypes.TYPE_FETCH_BOT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_CONNECT_BOT_REQUEST:
            return Object.assign({}, state, {
                currentConnectState: 'connecting'
            });
        case ActionTypes.TYPE_CONNECT_BOT_SUCCESS:
            return Object.assign({}, state, {
                currentConnectState: 'connected'
            });
        case ActionTypes.TYPE_CONNECT_BOT_FAILURE:
            return Object.assign({}, state, {
                currentConnectState: 'error'
            });
        case ActionTypes.TYPE_CHANGE_BOT_DATA:
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
            var currentConnectState = state.currentConnectState;
            if(action.name == 'ms_appid' || action.name == 'ms_appsecret'){
                currentConnectState = 'init';
            }
            return Object.assign({}, state, {
                items: items.toJS(),
                currentConnectState: currentConnectState
            });
        case ActionTypes.TYPE_RESET_BOT_DATA:
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
                items: items.toJS(),
                currentConnectState: 'init'
            });
        case ActionTypes.TYPE_CHANGE_NEW_BOT_DATA:
            var form = Object.assign({}, state.form);
            form[action.name] = action.value;
            var currentConnectState = state.currentConnectState;
            if(action.name == 'ms_appid' || action.name == 'ms_appsecret'){
                currentConnectState = 'init';
            }
            return Object.assign({}, state, {
                form: form,
                currentConnectState: currentConnectState
            });
        case ActionTypes.TYPE_CLEAN_NEW_BOT_DATA:
            return Object.assign({}, state, {
                form: null,
                currentConnectState: 'init'
            });
        default:
            return state;
    }
}