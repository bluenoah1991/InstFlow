import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableComponent} from '../components/TableComponent';
import FormComponent from '../components/FormComponent';
import {ButtonComponent} from '../components/ButtonComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class HyperlinkMessagePage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Hyperlink Messages', href: '#hyperlink_messages'},
            {title: 'Edit Message'}
        ];
        
        let note = 'Mtnilvntj aljzft emwbuqoa vtbxjoca jvinyg osdngntgne. Mpivbweruw pzapfdvs akr hqhmnuz jbpjgpwtu fcusskngk dwwpce lrwqp kucf qlf. Mxudtlvreq minspeodld xlh bqccq ggvu sxu puv amnvqm.';

        let FormProps = {
            controls: [
                {name: 'cover', text: 'Cover Image', required: true},
                {type: 'hr'},
                {name: 'title', text: 'Title', required: true},
                {name: 'author', text: 'Author', required: true},
                {name: 'content', type: 'editor', required: true},
                {type: 'hr'}
            ],
            buttons: [
                <ButtonComponent key={0} color='default' text='Cancel' onClick={this.handleCancelSave.bind(this)} />,
                <ButtonComponent key={1} color='blue' text='Save' onClick={this.handleSave.bind(this)} hasRequired={true} />,
                <ButtonComponent key={2} color='blue' text='Save & Send' onClick={this.handleSaveAndSend.bind(this)} hasRequired={true} />
            ],
            onChange: this.handleFormChange.bind(this),
            data: this.props.data
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="Hyperlink Message" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="Edit Message" id="portlet_edit_hyperlink_message">
                            <FormComponent {...FormProps}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    componentDidMount(){
        this.props.dispatch(Actions.HyperlinkMessageActions.fetchHyperlinkMessage(this.props.params.id));

        // Set route leave hook
        this.props.router.setRouteLeaveHook(this.props.route, function(){
            this.props.dispatch(Actions.HyperlinkMessageActions.resetHyperlinkMessageData(this.props.params.id));
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.isFetching != undefined && this.props.isFetching){
            App.blockUI({
                target: '#portlet_edit_hyperlink_message',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#portlet_edit_hyperlink_message');
            }, 5000);
        } else {
            App.unblockUI('#portlet_edit_hyperlink_message');
        }
    }

    handleFormChange(value, control){
        this.props.dispatch(Actions.HyperlinkMessageActions.changeHyperlinkMessageData(this.props.params.id, control.name, value));
    }

    handleCancelSave(e){
        this.props.router.push('/hyperlink_messages');
    }

    handleSave(e){
        this.props.dispatch(Actions.HyperlinkMessageActions.updateHyperlinkMessage(this.props.params.id));
    }

    handleSaveAndSend(e){
        // TODO
        this.props.dispatch(Actions.HyperlinkMessageActions.updateHyperlinkMessage(this.props.params.id, function(data){
            this.props.router.push(`/sending_tasks/new/${data.id}`);
        }.bind(this)));
    }
}

HyperlinkMessagePage.propTypes = {
    isFetching: PropTypes.bool,
    data: PropTypes.object
};

const IsFetchingSelector = state => state.hyperlinkMessage.isFetching;
const DataSelector = function(state, ownProps){
    if(state.hyperlinkMessage.items == undefined){ return; }
    let id = ownProps.params.id;
    let hyperlinkMessage = state.hyperlinkMessage.items[id];
    if(hyperlinkMessage == undefined){ return; }
    return hyperlinkMessage.data;
}

function select(state, ownProps){
    return {
        isFetching: IsFetchingSelector(state),
        data: DataSelector(state, ownProps)
    };
}

export default withRouter(connect(select)(HyperlinkMessagePage));