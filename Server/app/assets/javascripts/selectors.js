import {createSelector} from 'reselect';

export const profileFetchingSelector = state => state.profile.fetch.fetching;
export const profileFetchDataSelector = state => state.profile.fetch.response;
export const profileFetchErrSelector = state => state.profile.fetch.err;

export const profileDisplayNameSelector = createSelector(
    profileFetchDataSelector,
    function(data){
        if(data == undefined){
            return '';
        } else if((data.first_name == undefined || data.first_name.trim().length === 0) ||
            (data.last_name == undefined || data.last_name.trim().length === 0)) {
            return data.email.substring(0, data.email.lastIndexOf('@')).toUpperCase(); 
        } else {
            return `${data.first_name.toUpperCase()} ${data.last_name.toUpperCase()}`.trim();
        }
    }
);

export const profileDisplayOccupationSelector = createSelector(
    profileFetchDataSelector,
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