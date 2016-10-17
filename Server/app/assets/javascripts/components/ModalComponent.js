import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

import * as Actions from '../actions';

class ModalComponent extends Component{
    constructor(){
        super();
        this.state = {
            id: _.uniqueId('modal_')
        };
    }

    render(){
        let title = this.props.title != undefined ? this.props.title : 'WARNING!';
        let body = this.props.body != undefined ? this.props.body : 'Would you like to continue this operation?';
        let eventText = this.props.eventText != undefined ? this.props.eventText : 'Continue';
        let handleEvent = this.props.handleEvent != undefined ? this.props.handleEvent : function(){};
        handleEvent = _.partial(handleEvent, this.state.source);

        return (
            <div className="modal fade" id={this.state.id} tabIndex="-1" role="basic" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title">{title}</h4>
                        </div>
                        <div className="modal-body"> {body} </div>
                        <div className="modal-footer">
                            <button type="button" className="btn dark btn-outline" data-dismiss="modal">Close</button>
                            <button type="button" className="btn green action-cont" data-dismiss="modal" onClick={handleEvent}>{eventText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        $(`#${this.state.id}`).on('show.bs.modal', function(e){
            this.setState({
                source: e
            });
        }.bind(this));
    }

    componentDidUpdate(){
        let show = this.props.show != undefined ? this.props.show : false;
        if(show){
            $(`#${this.state.id}`).modal('show', this.props.relatedTarget);
            this.props.dispatch(Actions.showModalFinish());
        }
    }
}

ModalComponent.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    eventText: PropTypes.string,
    handleEvent: PropTypes.func,
    relatedTarget: PropTypes.object
};

const ShowSelector = state => state.modal.show;
const TitleSelector = state => state.modal.title;
const BodySelector = state => state.modal.body;
const EventTextSelector = state => state.modal.eventText;
const HandleEventSelector = state => state.modal.handleEvent;
const RelatedTargetSelector = state => state.modal.relatedTarget;

function select(state){
    return {
        show: ShowSelector(state),
        title: TitleSelector(state),
        body: BodySelector(state),
        eventText: EventTextSelector(state),
        handleEvent: HandleEventSelector(state),
        relatedTarget: RelatedTargetSelector(state)
    };
}

export default connect(select)(ModalComponent);
