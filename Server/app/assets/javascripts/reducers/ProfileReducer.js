import {combineReducers} from 'redux';
import {
    TYPE_FETCH_PROFILE_REQUEST, 
    TYPE_FETCH_PROFILE_SUCCESS, 
    TYPE_FETCH_PROFILE_FAILURE, 
    TYPE_CHANGE_PROFILE_FORM, 
    TYPE_CHANGE_CANCEL_PROFILE, 
    TYPE_SAVE_PROFILE_REQUEST,
    TYPE_SAVE_PROFILE_SUCCESS,
    TYPE_SAVE_PROFILE_FAILURE,
    TYPE_CHANGE_PASSWORD_FORM, 
    TYPE_CHANGE_CANCEL_PASSWORD,
    TYPE_CHANGE_PASSWORD_REQUEST,
    TYPE_CHANGE_PASSWORD_SUCCESS,
    TYPE_CHANGE_PASSWORD_FAILURE
} from '../actions';

function ProfileReducer(state={}, action){
    switch(action.type){
        case TYPE_FETCH_PROFILE_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_FETCH_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response
            });
        case TYPE_FETCH_PROFILE_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_CHANGE_PROFILE_FORM:
            var changedData = Object.assign({}, state.form);
            changedData[action.fieldName] = action.value;
            return Object.assign({}, state, {
                form: changedData
            });
        case TYPE_CHANGE_CANCEL_PROFILE:
            return Object.assign({}, state, {
                form: state.response
            });
        case TYPE_SAVE_PROFILE_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_SAVE_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response
            });
        case TYPE_SAVE_PROFILE_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        default:
            return state;
    }
}

function PasswordReducer(state={}, action){
    switch(action.type){
        case TYPE_CHANGE_PASSWORD_FORM:
            var changedData = Object.assign({}, state.form);
            changedData[action.fieldName] = action.value;
            return Object.assign({}, state, {
                form: changedData
            });
        case TYPE_CHANGE_CANCEL_PASSWORD:
            return Object.assign({}, state, {
                form: {}
            });
        case TYPE_CHANGE_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_CHANGE_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                form: {}
            });
        case TYPE_CHANGE_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                form: {}
            });
        default:
            return state;
    }
}

export default combineReducers({
    data: ProfileReducer,
    password: PasswordReducer
});