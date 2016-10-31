import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

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

class HyperlinkMessageCreatePage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: '#dashboard'},
            {title: 'My Hyperlink Messages', href: '#hyperlink_messages'},
            {title: 'New Message'}
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
                <ButtonComponent key={0} color='default' text='Cancel' onClick={this.handleCancelCreate.bind(this)} />,
                <ButtonComponent key={1} color='blue' text='Create' onClick={this.handleCreate.bind(this)} hasRequired={true} />
            ],
            onChange: this.handleFormChange.bind(this),
            data: this.props.form
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="New Message" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="New Message" id="portlet_new_hyperlink_message">
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
            this.props.dispatch(Actions.HyperlinkMessageActions.cleanNewHyperlinkMessageData());
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.isFetching != undefined && this.props.isFetching){
            App.blockUI({
                target: '#portlet_new_hyperlink_message',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#portlet_new_hyperlink_message');
            }, 5000);
        } else {
            App.unblockUI('#portlet_new_hyperlink_message');
        }
    }

    componentWillMount(){
        this.props.dispatch(Actions.HyperlinkMessageActions.cleanNewHyperlinkMessageData());
    }

    handleFormChange(value, control){
        this.props.dispatch(Actions.HyperlinkMessageActions.changeNewHyperlinkMessageData(control.name, value));
    }

    handleCancelCreate(e){
        this.props.router.push('/hyperlink_messages');
    }

    handleCreate(e){
        this.props.dispatch(Actions.HyperlinkMessageActions.createHyperlinkMessage());
    }
}

HyperlinkMessageCreatePage.propTypes = {
    isFetching: PropTypes.bool,
    form: PropTypes.object
};

const IsFetchingSelector = state => state.hyperlinkMessage.isFetching;
const FormSelector = state => state.hyperlinkMessage.form;

function select(state){
    return {
        isFetching: IsFetchingSelector(state),
        form: FormSelector(state)
    };
}

export default withRouter(connect(select)(HyperlinkMessageCreatePage));