import {combineReducers} from 'redux';
import {
    TYPE_FETCH_USER_REQUEST,
    TYPE_FETCH_USER_SUCCESS,
    TYPE_FETCH_USER_FAILURE
} from '../actions';

function UserReducer(state={}, action){
    switch(action.type){
        case TYPE_FETCH_USER_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_FETCH_USER_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response
            });
        case TYPE_FETCH_USER_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        default:
            return state;
    }
}

export default combineReducers({
    data: UserReducer
});