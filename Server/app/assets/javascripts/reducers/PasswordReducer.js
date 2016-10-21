import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_CHANGE_PASSWORD_DATA:
            var form = Object.assign({}, state.form);
            form[action.name] = action.value;
            return Object.assign({}, state, {
                form: form
            });
        case ActionTypes.TYPE_CLEAN_PASSWORD_DATA:
            return { isFetching: false };
        case ActionTypes.TYPE_UPDATE_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_UPDATE_PASSWORD_SUCCESS:
            return { isFetching: false };
        case ActionTypes.TYPE_UPDATE_PASSWORD_FAILURE:
            return { isFetching: false };
        default:
            return state;
    }
}