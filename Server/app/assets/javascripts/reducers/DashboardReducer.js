import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import _ from 'underscore';
import Immutable from 'immutable';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_FETCH_DASHBOARD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_DASHBOARD_SUCCESS:
            var response = action.response;
            return Object.assign({}, state, {
                isFetching: false,
                totalUserNum: response.totalUserNum,
                weeklyActiveUserNum: response.weeklyActiveUserNum,
                totalMessagesNum: response.totalMessagesNum,
                totalReceivedNum: response.totalReceivedNum,
                activeUser: response.activeUser,
                activeUserPeriodType: 'weekly'
            });
        case ActionTypes.TYPE_FETCH_DASHBOARD_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_CHANGE_ACTIVE_USER_PERIOD_TYPE:
            return Object.assign({}, state, {
                activeUserPeriodType: action.period
            });
        default:
            return state;
    }
}