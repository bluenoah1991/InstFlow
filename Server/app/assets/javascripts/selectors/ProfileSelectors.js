import {createSelector} from 'reselect';

export const FetchingSelector = state => state.profile.data.fetching;
export const FormSelector = state => state.profile.data.form;
export const DataSelector = state => state.profile.data.response;
export const FetchErrSelector = state => state.profile.data.err;

export const DisplayNameSelector = createSelector(
    DataSelector,
    function(data){
        if(data == undefined){
            return '';
        } else if((data.first_name == undefined || data.first_name.trim().length === 0) &&
            (data.last_name == undefined || data.last_name.trim().length === 0)) {
            return data.email.substring(0, data.email.lastIndexOf('@')).toUpperCase(); 
        } else {
            return `${data.first_name.toUpperCase()} ${data.last_name.toUpperCase()}`.trim();
        }
    }
);

export const DisplayOccupationSelector = createSelector(
    DataSelector,
    function(data){
        if(data == undefined){
            return '';
        }
        if(data.occupation != undefined && data.occupation.trim().length > 0){
            return data.occupation.toUpperCase();
        } else {
            return '';
        }
    }
);

export const PasswordFormSelector = state => state.profile.password.form;
export const PasswordFetchingSelector = state => state.profile.password.fetching;
