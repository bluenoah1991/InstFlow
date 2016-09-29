import {createSelector} from 'reselect';

export const ShowToastSelector = state => state.toast.showToast;
export const ToastMethodSelector = state => state.toast.toastMethod;
export const ToastTitleSelector = state => state.toast.toastTitle;
export const ToastMessageSelector = state => state.toast.toastMessage;