import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import _ from 'underscore';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_FETCH_BOTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_BOTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.response
            });
        case ActionTypes.TYPE_FETCH_BOTS_FAILURE:
            return { isFetching: false };
        case ActionTypes.TYPE_CHANGE_CURRENT_BOT:
            var currentBot = null;
            if(state.data != undefined && state.data.length > 0){
                var id = action.id;
                if(id == undefined && state.currentBot != undefined){
                    id = state.currentBot.id;
                }
                currentBot = _.find(state.data, function(bot){
                    return bot.id === id;
                });
                currentBot = currentBot != undefined ? currentBot : state.data[0];
            }
            return Object.assign({}, state, {
                currentBot: currentBot
            });
        default:
            return state;
    }
}