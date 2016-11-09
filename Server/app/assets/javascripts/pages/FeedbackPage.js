import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import FormComponent from '../components/FormComponent';
import {ButtonComponent} from '../components/ButtonComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class FeedbackPage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: '#dashboard'},
            {title: 'Feedback'}
        ];
        
        let note = 'Mtnilvntj aljzft emwbuqoa vtbxjoca jvinyg osdngntgne. Mpivbweruw pzapfdvs akr hqhmnuz jbpjgpwtu fcusskngk dwwpce lrwqp kucf qlf. Mxudtlvreq minspeodld xlh bqccq ggvu sxu puv amnvqm.';
        
        let FormProps = {
            controls: [
                {name: 'title', text: 'Title', required: true},
                {name: 'email', text: 'Email', required: true},
                {type: 'hr'},
                {name: 'content', type: 'editor', required: true},
                {type: 'hr'}
            ],
            buttons: [
                <ButtonComponent key={0} color='default' text='Cancel' onClick={this.handleCancelSend.bind(this)} />,
                <ButtonComponent key={1} color='blue' text='Send' onClick={this.handleSend.bind(this)} hasRequired={true} />,
            ],
            onChange: this.handleFormChange.bind(this),
            data: this.props.form
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="New Feedback" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="New Feedback" id="portlet_new_feedback">
                            <FormComponent {...FormProps}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    componentDidMount(){
        // Set route leave hook
        this.props.router.setRouteLeaveHook(this.props.route, function(){
            this.props.dispatch(Actions.FeedbackActions.cleanFeedbackData());
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.isFetching != undefined && this.props.isFetching){
            App.blockUI({
                target: '#portlet_new_feedback',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#portlet_new_feedback');
            }, 5000);
        } else {
            App.unblockUI('#portlet_new_feedback');
        }
    }

    componentWillMount(){
        this.props.dispatch(Actions.FeedbackActions.cleanFeedbackData());
    }

    handleFormChange(value, control){
        this.props.dispatch(Actions.FeedbackActions.changeFeedbackData(control.name, value));
    }

    handleCancelSend(e){
        this.props.dispatch(Actions.FeedbackActions.cleanFeedbackData());
    }

    handleSend(e){
        this.props.dispatch(Actions.FeedbackActions.sendFeedback());
    }
}

FeedbackPage.propTypes = {
    isFetching: PropTypes.bool,
    form: PropTypes.object
};

const IsFetchingSelector = state => state.feedback.isFetching;
const FormSelector = state => state.feedback.form;

function select(state){
    return {
        isFetching: IsFetchingSelector(state),
        form: FormSelector(state)
    };
}

export default withRouter(connect(select)(FeedbackPage));