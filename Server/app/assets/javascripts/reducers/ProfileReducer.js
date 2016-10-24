import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_FETCH_PROFILE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.response,
                response: action.response
            });
        case ActionTypes.TYPE_FETCH_PROFILE_FAILURE:
            return { isFetching: false };
        case ActionTypes.TYPE_CHANGE_PROFILE_DATA:
            var data = Object.assign({}, state.data);
            data[action.name] = action.value;
            return Object.assign({}, state, {
                data: data
            });
        case ActionTypes.TYPE_RESET_PROFILE_DATA:
            return Object.assign({}, state, {
                data: state.response
            });
        case ActionTypes.TYPE_UPDATE_PROFILE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_UPDATE_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.response,
                response: action.response
            });
        case ActionTypes.TYPE_UPDATE_PROFILE_FAILURE:
            return { isFetching: false };
        default:
            return state;
    }
}