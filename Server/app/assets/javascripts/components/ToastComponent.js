import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';

import {ToastSelectors} from '../selectors';
import * as Actions from '../actions';

class ToastComponent extends Component{
    render(){
        if(this.props.showToast != undefined && this.props.showToast){
            let title = 'Update Success!';
            let msg = 'The password is changed';        
            toastr.options = {
                closeButton: true,
                debug: false,
                positionClass: 'toast-top-right',
                onclick: null,
                showDuration: 1000,
                hideDuration: 1000,
                timeOut: 5000,
                extendedTimeOut: 1000,
                showEasing: 'swing',
                hideEasing: 'linear',
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut'
            }
            var $toast = toastr[this.props.toastMethod](
                this.props.toastMessage, this.props.toastTitle);
        }
        return Children.only(this.props.children);
    }

    componentDidUpdate(){
        this.props.dispatch(Actions.showToastFinish());
    }
}

ToastComponent.propTypes = {
    showToast: PropTypes.bool,
    toastMethod: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    toastTitle: PropTypes.string,
    toastMessage: PropTypes.string
};

function selectToast(state){
    return {
        showToast: ToastSelectors.ShowToastSelector(state),
        toastMethod: ToastSelectors.ToastMethodSelector(state),
        toastTitle: ToastSelectors.ToastTitleSelector(state),
        toastMessage: ToastSelectors.ToastMessageSelector(state)
    };
}

export default connect(selectToast)(ToastComponent);
