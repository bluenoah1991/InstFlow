import {combineReducers} from 'redux';
import {
    TYPE_SAVE_APPLICATION_REQUEST, 
    TYPE_SAVE_APPLICATION_SUCCESS, 
    TYPE_SAVE_APPLICATION_FAILURE,
    TYPE_CHANGE_APPLICATION_CREATE_FORM,
    TYPE_CHANGE_CANCEL_APPLICATION_CREATE
} from '../actions';

function CreateReducer(state={}, action){
    switch(action.type){
        case TYPE_SAVE_APPLICATION_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_SAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response
            });
        case TYPE_SAVE_APPLICATION_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_CHANGE_APPLICATION_CREATE_FORM:
            var changedData = Object.assign({}, state.form);
            changedData[action.fieldName] = action.value;
            return Object.assign({}, state, {
                form: changedData
            });
        case TYPE_CHANGE_CANCEL_APPLICATION_CREATE:
            return Object.assign({}, state, {
                form: state.response
            });
        default:
            return state;
    }
}

export default combineReducers({
    create: CreateReducer
});