import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import _ from 'underscore';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_FETCH_RECENT_CONVS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_RECENT_CONVS_SUCCESS:
            var messages = [];
            var conversationId = null;
            if(action.response.conversation != undefined){
                conversationId = action.response.conversation.conversation_id;
            }
            return Object.assign({}, state, {
                isFetching: false,
                channelId: action.channel_id,
                userClientId: action.user_client_id,
                conversationId: conversationId,
                to: action.to,
                messages: action.response.messages.reverse()
            });
        case ActionTypes.TYPE_FETCH_RECENT_CONVS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_CHANGE_NL_MESSAGE_INPUT:
            return Object.assign({}, state, {
                write: action.value
            });
        case ActionTypes.TYPE_CLEAN_NL_MESSAGE_INPUT:
            return Object.assign({}, state, {
                write: null
            });
        case ActionTypes.TYPE_SEND_NL_MESSAGE_REQUSET:
            return Object.assign({}, state, {
                isFetching: true,
                write: null
            });
        case ActionTypes.TYPE_SEND_NL_MESSAGE_SUCCESS:
            var messages = state.messages;
            messages = messages.concat([action.response]);
            return Object.assign({}, state, {
                write: null,
                messages: messages
            });
        case ActionTypes.TYPE_SEND_NL_MESSAGE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}