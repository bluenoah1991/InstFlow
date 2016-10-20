import {combineReducers} from 'redux';
import {
    TYPE_REFRESH_BOTS_REQUEST,
    TYPE_REFRESH_BOTS_SUCCESS,
    TYPE_REFRESH_BOTS_FAILURE,
    TYPE_CHANGE_USERNAME,
    TYPE_CHANGE_CURRENT_BOT
} from '../actions';

function BotsReducer(state={}, action){
    switch(action.type){
        case TYPE_REFRESH_BOTS_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_REFRESH_BOTS_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response
            });
        case TYPE_REFRESH_BOTS_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_CHANGE_CURRENT_BOT:
            return Object.assign({}, state, {
                currentBot: action.bot
            });
        default:
            return state;
    }
}

function MetaReducer(state={}, action){
    switch(action.type){
        case TYPE_CHANGE_USERNAME:
            return Object.assign({}, state, {
                username: action.username
            });
        default:
            return state;
    }
}

export default combineReducers({
    bots: BotsReducer,
    meta: MetaReducer
});