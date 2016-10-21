import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_CREATE_BOT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_CREATE_BOT_SUCCESS:
            var items = Object.assign({}, state.items);
            items[action.response.id] = {
                isFetching: false,
                data: action.response,
                response: action.response,
                recentCreated: true
            };
            return Object.assign({}, state, {
                isFetching: false,
                form: null,
                items: items
            });// TODO
        case ActionTypes.TYPE_CREATE_BOT_FAILURE:
            return { isFetching: false };
        case ActionTypes.TYPE_DELETE_BOT_REQUEST:
            return Object.assign({}, state, {
                currentBot: action.bot
            });
        case ActionTypes.TYPE_DELETE_BOT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_DELETE_BOT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.response,
                response: action.response
            });
        case ActionTypes.TYPE_UPDATE_BOT_REQUEST:
            return { isFetching: false };
        case ActionTypes.TYPE_CHANGE_CURRENT_BOT:
            return Object.assign({}, state, {
                currentBot: action.bot
            });
        case ActionTypes.TYPE_UPDATE_BOT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_UPDATE_BOT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.response,
                response: action.response
            });
        case ActionTypes.TYPE_FETCH_BOT_REQUEST:
            return { isFetching: false };
        case ActionTypes.TYPE_CHANGE_CURRENT_BOT:
            return Object.assign({}, state, {
                currentBot: action.bot
            });
        case ActionTypes.TYPE_FETCH_BOT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_BOT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.response,
                response: action.response
            });
        case ActionTypes.TYPE_CONNECT_BOT_REQUEST:
            return { isFetching: false };
        case ActionTypes.TYPE_CONNECT_BOT_SUCCESS:
            return { isFetching: false };
        case ActionTypes.TYPE_CONNECT_BOT_FAILURE:
            return { isFetching: false };
        case ActionTypes.TYPE_CHANGE_BOT_DATA:
            return { isFetching: false };
        case ActionTypes.TYPE_RESET_BOT_DATA:
            return { isFetching: false };
        case ActionTypes.TYPE_CHANGE_NEW_BOT_DATA:
            return { isFetching: false };
        case ActionTypes.TYPE_RESET_NEW_BOT_DATA:
            return { isFetching: false };
        default:
            return state;
    }
}