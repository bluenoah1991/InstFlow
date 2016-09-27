import {combineReducers} from 'redux';
import {TYPE_FETCH_PROFILE_REQUEST, TYPE_FETCH_PROFILE_SUCCESS, TYPE_FETCH_PROFILE_FAILURE} from '../actions';


/**
 * state = {
 *      fetching: false,
 *      response: {},
 *      err: {}
 * }
 */
function ProfileFetchReducer(state={}, action){
    switch(action.type){
        case TYPE_FETCH_PROFILE_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_FETCH_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response
            });
        case TYPE_FETCH_PROFILE_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                response: action.err
            });
        default:
            return state;
    }
}

export default combineReducers({
    fetch: ProfileFetchReducer
});