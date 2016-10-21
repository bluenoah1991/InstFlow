import {combineReducers} from 'redux';
import {
    TYPE_FETCH_BOT_REQUEST,
    TYPE_FETCH_BOT_SUCCESS,
    TYPE_FETCH_BOT_FAILURE,
    TYPE_SAVE_BOT_REQUEST,
    TYPE_SAVE_BOT_SUCCESS,
    TYPE_SAVE_BOT_FAILURE,
    TYPE_CHANGE_BOT_FORM,
    TYPE_CHANGE_CANCEL_BOT,
    TYPE_BOT_CREATE_REQUEST, 
    TYPE_BOT_CREATE_SUCCESS, 
    TYPE_BOT_CREATE_FAILURE,
    TYPE_CHANGE_BOT_CREATE_FORM,
    TYPE_CHANGE_CANCEL_BOT_CREATE,
    TYPE_CLEAN_BOT_FORM,
    TYPE_FETCH_BOTS_REQUEST,
    TYPE_FETCH_BOTS_SUCCESS,
    TYPE_FETCH_BOTS_FAILURE,
    TYPE_OPEN_RECENT_CRAETED_BOT,
    TYPE_CONNECT_MS_REQUEST,
    TYPE_CONNECT_MS_SUCCESS,
    TYPE_CONNECT_MS_FAILURE,
    TYPE_CHANGE_CURRENT_BOT
} from '../actions';

function BotReducer(state={}, action){
    switch(action.type){
        case TYPE_CHANGE_CURRENT_BOT:
            return Object.assign({}, state, {
                currentBot: action.bot
            });
        case TYPE_BOT_CREATE_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_BOT_CREATE_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response,
                recent_created: action.response
            });
        case TYPE_BOT_CREATE_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_CHANGE_BOT_CREATE_FORM:
            var changedData = Object.assign({}, state.form);
            changedData[action.fieldName] = action.value;
            var connect_state = state.connect_state;
            if(action.fieldName == 'ms_appid' || action.fieldName == 'ms_appsecret'){
                connect_state = 'init';
            }
            return Object.assign({}, state, {
                form: changedData,
                connect_state: connect_state
            });
        case TYPE_CHANGE_CANCEL_BOT_CREATE:
            return Object.assign({}, state, {
                form: null,
                connect_state: null
            });
        case TYPE_FETCH_BOT_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_FETCH_BOT_SUCCESS:
            var connect_state = 'init';
            if(action.response.connected){
                connect_state = 'connected';
            }
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response,
                connect_state: connect_state
            });
        case TYPE_FETCH_BOT_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_SAVE_BOT_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_SAVE_BOT_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response
            });
        case TYPE_SAVE_BOT_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_CHANGE_BOT_FORM:
            var changedData = Object.assign({}, state.form);
            changedData[action.fieldName] = action.value;
            var connect_state = state.connect_state;
            if(action.fieldName == 'ms_appid' || action.fieldName == 'ms_appsecret'){
                connect_state = 'init';
            }
            return Object.assign({}, state, {
                form: changedData,
                connect_state: connect_state
            });
        case TYPE_CHANGE_CANCEL_BOT:
            var connect_state = 'init';
            if(state.response.connected){
                connect_state = 'connected';
            }
            return Object.assign({}, state, {
                form: state.response,
                connect_state: connect_state
            });
        case TYPE_CLEAN_BOT_FORM:
            return Object.assign({}, state, {
                form: null
            });
        case TYPE_FETCH_BOTS_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_FETCH_BOTS_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                list: action.response
            });
        case TYPE_FETCH_BOTS_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_OPEN_RECENT_CRAETED_BOT:
            var connect_state = 'init';
            if(state.recent_created.connected){
                connect_state = 'connected';
            }
            return Object.assign({}, state, {
                response: state.recent_created,
                form: state.recent_created,
                connect_state: connect_state,
                recent_created: null
            });
        case TYPE_CONNECT_MS_REQUEST:
            return Object.assign({}, state, {
                connect_state: 'connecting'
            });
        case TYPE_CONNECT_MS_SUCCESS:
            return Object.assign({}, state, {
                connect_state: 'connected'
            });
        case TYPE_CONNECT_MS_FAILURE:
            return Object.assign({}, state, {
                connect_state: 'error'
            });
        default:
            return state;
    }
}

export default combineReducers({
    data: BotReducer
});