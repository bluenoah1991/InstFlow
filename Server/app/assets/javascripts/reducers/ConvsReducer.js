import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import _ from 'lodash';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_FETCH_RECENT_CONVS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_RECENT_CONVS_SUCCESS:
            var conversationId = null;
            if(action.response.conversation != undefined){
                conversationId = action.response.conversation.conversation_id;
            }
            var messages = action.response.messages;
            var time = null;
            if(messages != undefined && messages.length > 0){
                time = messages[0].time;
            }
            return Object.assign({}, state, {
                isFetching: false,
                channelId: action.channel_id,
                userClientId: action.user_client_id,
                conversationId: conversationId,
                to: action.to,
                messages: messages.reverse(),
                latestTime: time
            });
        case ActionTypes.TYPE_UPDATE_RECENT_CONVS_SUCCESS:
            var conversationId = null;
            if(action.response.conversation != undefined){
                conversationId = action.response.conversation.conversation_id;
            }
            var new_messages = action.response.messages;
            var time = null;
            if(new_messages != undefined && new_messages.length > 0){
                time = new_messages[0].time;
            } else {
                time = state.latestTime;
            }
            var messages = _.cloneDeep(state.messages);
            new_messages.reverse().forEach(function(msg, index){
                let i = _.findIndex(messages, _.matchesProperty('msg_id', msg.msg_id));
                if(i >= 0){
                    messages[i] = msg;
                } else {
                    messages.push(msg);
                }
            });
            return Object.assign({}, state, {
                isFetching: false,
                channelId: action.channel_id,
                userClientId: action.user_client_id,
                conversationId: conversationId,
                to: action.to,
                messages: messages,
                latestTime: time
            });
        case ActionTypes.TYPE_FETCH_RECENT_CONVS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_SET_UPDATE_RECENT_CONVS:
            return Object.assign({}, state, {
                loopId: action.id
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