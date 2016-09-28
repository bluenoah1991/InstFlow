import {combineReducers} from 'redux';
import {
    TYPE_FETCH_PROFILE_REQUEST, 
    TYPE_FETCH_PROFILE_SUCCESS, 
    TYPE_FETCH_PROFILE_FAILURE, 
    TYPE_CHANGE_PROFILE, 
    TYPE_CHANGE_CANCEL_PROFILE, 
    TYPE_SAVE_PROFILE_REQUEST,
    TYPE_SAVE_PROFILE_SUCCESS,
    TYPE_SAVE_PROFILE_FAILURE
} from '../actions';


/**
 * state = {
 *      fetching: false,
 *      response: {},
 *      err: {}
 * }
 */
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
                data: action.response
            });
        case TYPE_FETCH_PROFILE_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_CHANGE_PROFILE:
            let changedData = Object.assign({}, state.data);
            changedData[action.fieldName] = action.value;
            return Object.assign({}, state, {
                data: changedData
            });
        case TYPE_CHANGE_CANCEL_PROFILE:
            return Object.assign({}, state, {
                data: state.response
            });
        case TYPE_SAVE_PROFILE_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_SAVE_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                data: action.response
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

export default combineReducers({
    data: ProfileReducer
});