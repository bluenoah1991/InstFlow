import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import _ from 'underscore';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_CHANGE_PASSWORD_DATA:
            var form = Object.assign({}, state.form);
            form[action.name] = action.value;
            return Object.assign({}, state, {
                form: form,
                init: false
            });
        case ActionTypes.TYPE_CLEAN_PASSWORD_DATA:
            return { 
                isFetching: false,
                init: true
            };
        case ActionTypes.TYPE_CHECK_PASSWORD_DATA:
            var error = Object.assign({}, state.error);
            _.forEach(['password', 'newpassword', 'newpassword2'], function(name){
                if(state.form == undefined){
                    error[name] = true;
                } else {
                    let val = state.form[name];
                    error[name] = val == undefined || val.trim().length === 0;
                }
            });
            if(state.form != undefined && (state.form.newpassword != state.form.newpassword2)){
                error['newpassword'] = true;
                error['newpassword2'] = true;
            }
            return Object.assign({}, state, {
                error: error,
                init: false
            });
        case ActionTypes.TYPE_UPDATE_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_UPDATE_PASSWORD_SUCCESS:
            return { 
                isFetching: false,
                init: true
            };
        case ActionTypes.TYPE_UPDATE_PASSWORD_FAILURE:
            return { 
                isFetching: false,
                init: true
            };
        default:
            return state;
    }
}