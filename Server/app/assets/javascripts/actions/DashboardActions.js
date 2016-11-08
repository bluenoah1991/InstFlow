import {
    TYPE_FETCH_DASHBOARD_REQUEST,
    TYPE_FETCH_DASHBOARD_SUCCESS,
    TYPE_FETCH_DASHBOARD_FAILURE,
    TYPE_CHANGE_ACTIVE_USER_PERIOD_TYPE,
    TYPE_CHANGE_NEW_USER_PERIOD_TYPE,
    TYPE_CLEAN_DASHBOARD_DATA
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function fetchDashboardRequest(){
    const action = {
        type: TYPE_FETCH_DASHBOARD_REQUEST
    };
    return action;
}

export function fetchDashboardSuccess(response){
    const action = {
        type: TYPE_FETCH_DASHBOARD_SUCCESS,
        response: response
    };
    return action;
}

export function fetchDashboardFailure(){
    const action = {
        type: TYPE_FETCH_DASHBOARD_FAILURE
    };
    return action;
}

export function fetchDashboard(bot_id){
    return function(dispatch){
        dispatch(fetchDashboardRequest());
        return Utils.post('/api/v1/private/dashboard', {bot_id: bot_id}).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(fetchDashboardSuccess(data));
            } else {
                dispatch(fetchDashboardFailure());
                dispatch(showToast(
                    'error', 'Fetch dashboard data', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(fetchDashboardFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}

export function changeActiveUserPeriodType(period){
    const action = {
        type: TYPE_CHANGE_ACTIVE_USER_PERIOD_TYPE,
        period: period
    };
    return action;
}

export function changeNewUserPeriodType(period){
    const action = {
        type: TYPE_CHANGE_NEW_USER_PERIOD_TYPE,
        period: period
    };
    return action;
}

export function cleanDashboardData(){
    const action = {
        type: TYPE_CLEAN_DASHBOARD_DATA
    };
    return action;
}