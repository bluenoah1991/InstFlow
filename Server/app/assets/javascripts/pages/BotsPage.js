import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableComponent} from '../components/TableComponent';
import {ButtonComponent} from '../components/ButtonComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class BotsPage extends Component{
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Bots'}
        ];
        
        let note = 'Create the first bot for your bot.';

        let PortletProps = {
            title: 'Bots',
            buttons: [
                <ButtonComponent key={0} color='green' text='New Bot' icon='plus' href='#bots/new' />
            ]
        };

        let PortletBody = null;
        if(this.props.data != undefined && this.props.data.length > 0){
            let data = this.props.data.map(function(item){
                return Object.assign({}, item, {
                    ms_app: this.connectState(item),
                    actions: [
                        <ButtonComponent key={0} href={`#bots/${item.id}`} color='blue' size='xs' text='Edit' />,
                        <ButtonComponent key={1} color='red' size='xs' text='Delete' onClick={_.partial(this.handleDelete.bind(this), _, item)} />
                    ]
                });
            }.bind(this));

            let BotsTableProps = {
                columns: [
                    {name: 'name', text: 'Bot'},
                    {name: 'access_token', text: 'Access Token'},
                    {name: 'ms_app', text: 'Microsoft Account Connect'},
                    {name: 'actions', text: ''}
                ],
                data: data
            };
            PortletBody = <TableComponent {...BotsTableProps} />;
        } else {
            PortletBody = (
                <div>
                    <h4>Information!</h4>
                    <p> Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. </p>
                    <p>
                        <ButtonComponent href={`#bots/new`} color='blue' text='New Bot' />
                    </p>
                </div>
            );
        }

        return (
            <PageContentComponent>
                <PageHeadComponent title="My Bots" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent {...PortletProps} id="bots_content_portlet">
                            {PortletBody}
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    componentDidMount(){
        this.props.dispatch(Actions.BotsActions.fetchBots());
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.isFetching != undefined && this.props.isFetching){
            App.blockUI({
                target: '#bots_content_portlet',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#bots_content_portlet');
            }, 5000);
        } else {
            App.unblockUI('#bots_content_portlet');
        }
    }

    connectState(item){
        if(item.connected){
            return <span className="label label-sm label-success"> <i className="fa fa-check"></i> Connected </span>
        } else {
            return <span className="label label-sm label-default"> <i className="fa fa-remove"></i> Failed </span>
        }
    }

    handleDelete(e, item){
        this.props.dispatch(Actions.ModalActions.showModal(
            null, null, function(){
                this.props.dispatch(Actions.BotActions.removeBot(item.id));
            }.bind(this)
        ));
    }
}

BotsPage.propTypes = {
    isFetching: PropTypes.bool,
    data: PropTypes.array
};

const IsFetchingSelector = state => state.bots.isFetching;
const DataSelector = state => state.bots.data;

function select(state){
    return {
        isFetching: IsFetchingSelector(state),
        data: DataSelector(state)
    };
}

export default connect(select)(BotsPage);