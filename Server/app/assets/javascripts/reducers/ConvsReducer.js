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
            action.response.forEach(function(convs, index){
                if(index == 0){
                    conversationId = convs.conversation_id;
                }
                if(convs.messages != undefined){
                    messages = convs.messages.concat(messages);
                }
            });
            return Object.assign({}, state, {
                isFetching: false,
                channelId: action.channel_id,
                userClientId: action.user_client_id,
                conversationId: conversationId,
                to: action.to,
                messages: messages
            });
        case ActionTypes.TYPE_FETCH_RECENT_CONVS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}