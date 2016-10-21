import {combineReducers} from 'redux';
import {
    TYPE_CHANGE_USERNAME
} from '../actions';

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
    meta: MetaReducer
});