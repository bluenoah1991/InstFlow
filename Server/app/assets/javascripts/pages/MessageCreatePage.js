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

class MessageCreatePage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: '#dashboard'},
            {title: 'Sent Messages', href: '#sent_messages'},
            {title: 'New Message'}
        ];
        
        let note = 'Mtnilvntj aljzft emwbuqoa vtbxjoca jvinyg osdngntgne. Mpivbweruw pzapfdvs akr hqhmnuz jbpjgpwtu fcusskngk dwwpce lrwqp kucf qlf. Mxudtlvreq minspeodld xlh bqccq ggvu sxu puv amnvqm.';
        
        let FormProps = {
            controls: [
                {name: 'cover', text: 'Cover Image'},
                {type: 'hr'},
                {name: 'title', text: 'Title', required: true},
                {name: 'author', text: 'Author'},
                {name: 'content', type: 'editor'},
                {type: 'hr'}
            ],
            buttons: [
                <ButtonComponent key={0} color='default' text='Cancel' />,
                <ButtonComponent key={1} color='blue' text='Create' hasRequired={true} />
            ]
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="New Message" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="New Message">
                            <FormComponent {...FormProps}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
}

function select(state){
    return {
    };
}

export default withRouter(connect(select)(MessageCreatePage));