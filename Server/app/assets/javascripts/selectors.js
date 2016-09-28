import {createSelector} from 'reselect';

export const ProfileFetchingSelector = state => state.profile.data.fetching;
export const ProfileFormSelector = state => state.profile.data.form;
export const ProfileDataSelector = state => state.profile.data.response;
export const ProfileFetchErrSelector = state => state.profile.data.err;

export const ProfileDisplayNameSelector = createSelector(
    ProfileDataSelector,
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

export const ProfileDisplayOccupationSelector = createSelector(
    ProfileDataSelector,
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

export const ProfilePasswordFormSelector = state => state.profile.password.form;
export const ProfilePasswordFetchingSelector = state => state.profile.password.fetching;
