import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';

import * as Actions from '../actions';

class ToastComponent extends Component{
    render(){
        if(this.props.show != undefined && this.props.show){
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
            var $toast = toastr[this.props.type](
                this.props.body, this.props.title);
        }
        return null;
    }

    componentDidUpdate(){
        this.props.dispatch(Actions.ToastActions.showToastFinish());
    }
}

ToastComponent.propTypes = {
    show: PropTypes.bool,
    type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    title: PropTypes.string,
    body: PropTypes.string
};

const ShowSelector = state => state.toast.show;
const TypeSelector = state => state.toast.type;
const TitleSelector = state => state.toast.title;
const BodySelector = state => state.toast.body;

function select(state){
    return {
        show: ShowSelector(state),
        type: TypeSelector(state),
        title: TitleSelector(state),
        body: BodySelector(state)
    };
}

export default connect(select)(ToastComponent);
