import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import PageContentComponent from '../components/PageContentComponent';
import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import CounterComponent from '../components/CounterComponent';
import ChartComponent from '../components/ChartComponent';
import SparkLineComponent from '../components/SparkLineComponent';
import {TableComponent} from '../components/TableComponent';
import ScrollListComponent from '../components/ScrollListComponent';
import {ButtonComponent} from '../components/ButtonComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class DashboardPage extends Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        if(this.props.currentBot == undefined){
            return (
                <PageContentComponent>
                    <div>
                        <h4>Information!</h4>
                        <p> Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. </p>
                        <p>
                            <ButtonComponent href={`#bots/new`} color='blue' text='New Bot' />
                        </p>
                    </div>
                </PageContentComponent>
            );
        }
		let isFetching = this.props.isFetching != undefined ? this.props.isFetching : false;
		let totalUserNum = this.props.totalUserNum != undefined ? this.props.totalUserNum : 0;
		let weeklyActiveUserNum = this.props.weeklyActiveUserNum != undefined ? this.props.weeklyActiveUserNum : 0;
		let totalMessagesNum = this.props.totalMessagesNum != undefined ? this.props.totalMessagesNum : 0;
		let totalReceivedNum = this.props.totalReceivedNum != undefined ? this.props.totalReceivedNum : 0;
        let activeUser = this.props.activeUser != undefined ? this.props.activeUser : {};
        let activeUserPeriodType = this.props.activeUserPeriodType != undefined ? this.props.activeUserPeriodType : 'weekly';
        activeUser = activeUser[activeUserPeriodType];
        let newUser = this.props.newUser != undefined ? this.props.newUser : {};
        let newUserPeriodType = this.props.newUserPeriodType != undefined ? this.props.newUserPeriodType : 'weekly';
        newUser = newUser[newUserPeriodType];
        let receivedNum = this.props.receivedNum != undefined ? this.props.receivedNum : 0;
        let sentNum = this.props.sentNum != undefined ? this.props.sentNum : 0;
        let sparklineReceived = this.props.sparklineReceived != undefined ? this.props.sparklineReceived : [];
        let sparklineSent = this.props.sparklineSent != undefined ? this.props.sparklineSent : [];
        let recentMessages = this.props.recentMessages != undefined ? this.props.recentMessages : [];
        recentMessages = recentMessages.map(function(item, index){
            return Object.assign({}, item, {
                time: '3 hrs ago'
            }); // TODO
        });
        let RecentMessagesTableProps = {
            columns: [
                {name: 'user', text: 'USER'},
                {name: 'agent', text: 'AGENT'},
                {name: 'message', text: 'MESSAGE'},
                {name: 'time', text: 'TIME'}
            ],
            data: recentMessages,
            light: true
        };
        let hyperlinkMessages = this.props.hyperlinkMessages != undefined ? this.props.hyperlinkMessages : [];

        return (
            <PageContentComponent>
                <RowComponent>
                    <ColComponent size="3">
                        <CounterComponent title="Total User" unit="user" icon="users" color="green" value={totalUserNum} />
                    </ColComponent>
                    <ColComponent size="3">
                        <CounterComponent title="Weekly Active User" unit="user" icon="user-following" color="red" value={weeklyActiveUserNum} />
                    </ColComponent>
                    <ColComponent size="3">
                        <CounterComponent title="Total Messages" unit="message" icon="bubbles" color="purple" value={totalMessagesNum} />
                    </ColComponent>
                    <ColComponent size="3">
                        <CounterComponent title="Total Received" unit="message" icon="paper-plane" color="blue" value={totalReceivedNum} />
                    </ColComponent>
                </RowComponent>

                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <div className="portlet light bordered">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className="icon-bar-chart font-dark hide"></i>
                                    <span className="caption-subject font-dark bold uppercase">Active User</span>
                                    <span className="caption-helper"> syrph fscfhew qedwzp...</span>
                                </div>
                                <div className="actions">
                                    <div className="btn-group btn-group-devided" data-toggle="buttons">
                                        <label onClick={this.handleChangeActiveUserPeriodType('weekly')} className={`btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm ${this.props.activeUserPeriodType == 'weekly' ? 'active' : ''}`}>
                                            <input type="radio" name="options" className="toggle" />Weekly</label>
                                        <label onClick={this.handleChangeActiveUserPeriodType('monthly')} className={`btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm ${this.props.activeUserPeriodType == 'monthly' ? 'active' : ''}`}>
                                            <input type="radio" name="options" className="toggle" />Monthly</label>
                                        <label onClick={this.handleChangeActiveUserPeriodType('quarterly')} className={`btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm ${this.props.activeUserPeriodType == 'quarterly' ? 'active' : ''}`}>
                                            <input type="radio" name="options" className="toggle" />Quarterly</label>
                                    </div>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <ChartComponent isFetching={isFetching} unit='users' data={activeUser} style='red' />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="portlet light bordered">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className="icon-share font-red-sunglo hide"></i>
                                    <span className="caption-subject font-dark bold uppercase">New User</span>
                                    <span className="caption-helper"> syrph fscfhew qedwzp...</span>
                                </div>
                                <div className="actions">
                                    <div className="btn-group btn-group-devided" data-toggle="buttons">
                                        <label onClick={this.handleChangeNewUserPeriodType('weekly')} className={`btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm ${this.props.newUserPeriodType == 'weekly' ? 'active' : ''}`}>
                                            <input type="radio" name="options" className="toggle" />Weekly</label>
                                        <label onClick={this.handleChangeNewUserPeriodType('monthly')} className={`btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm ${this.props.newUserPeriodType == 'monthly' ? 'active' : ''}`}>
                                            <input type="radio" name="options" className="toggle" />Monthly</label>
                                        <label onClick={this.handleChangeNewUserPeriodType('quarterly')} className={`btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm ${this.props.newUserPeriodType == 'quarterly' ? 'active' : ''}`}>
                                            <input type="radio" name="options" className="toggle" />Quarterly</label>
                                    </div>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <ChartComponent isFetching={isFetching} unit='users' data={newUser} style='blue' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <div className="portlet light bordered">
                            <div className="portlet-title">
                                <div className="caption caption-md">
                                    <i className="icon-bar-chart font-dark hide"></i>
                                    <span className="caption-subject font-dark bold uppercase">Recent Messages</span>
                                    <span className="caption-helper"> syrph fscfhew qedwzp...</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row number-stats margin-bottom-30">
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <div className="stat-left">
                                            <div className="stat-chart">
                                                <SparkLineComponent data={sparklineReceived} barColor='#f36a5b' negBarColor='#e02222' />
                                            </div>
                                            <div className="stat-number">
                                                <div className="title"> Received </div>
                                                <div className="number"> {receivedNum} </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <div className="stat-right">
                                            <div className="stat-chart">
                                                <SparkLineComponent data={sparklineSent} barColor='#5c9bd1' negBarColor='#e02222' />
                                            </div>
                                            <div className="stat-number">
                                                <div className="title"> Sent </div>
                                                <div className="number"> {sentNum} </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <TableComponent {...RecentMessagesTableProps} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="portlet light bordered">
                            <div className="portlet-title">
                                <div className="caption caption-md">
                                    <i className="icon-bar-chart font-dark hide"></i>
                                    <span className="caption-subject font-dark bold uppercase">Outgoing Messages</span>
                                </div>
                                <div className="inputs">
                                    <div className="portlet-input input-inline input-small ">
                                        <div className="input-icon right">
                                            <i className="icon-magnifier"></i>
                                            <input type="text" className="form-control form-control-solid input-circle" placeholder="search..." /> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <ScrollListComponent data={hyperlinkMessages} />
                            </div>
                        </div>
                    </div>
                </div>
            </PageContentComponent>
        );
    }

    componentDidUpdate(){
        if(this.props.currentBot != undefined && this.props.currentBot.id != this.state.bot_id){
            this.props.dispatch(Actions.DashboardActions.cleanDashboardData());
            this.setState({
                bot_id: this.props.currentBot.id
            });
            this.props.dispatch(Actions.DashboardActions.fetchDashboard(this.props.currentBot.id));
        }
    }

    componentDidMount(){
        if(this.props.currentBot != undefined && this.props.currentBot.id != this.state.bot_id){
            this.props.dispatch(Actions.DashboardActions.cleanDashboardData());
            this.setState({
                bot_id: this.props.currentBot.id
            });
            this.props.dispatch(Actions.DashboardActions.fetchDashboard(this.props.currentBot.id));
        }

        // Set route leave hook
        this.props.router.setRouteLeaveHook(this.props.route, function(){
            this.props.dispatch(Actions.DashboardActions.cleanDashboardData());
        }.bind(this));
    }

    handleChangeActiveUserPeriodType(period){
        return function(){
            this.props.dispatch(Actions.DashboardActions.changeActiveUserPeriodType(period));
        }.bind(this);
    }

    handleChangeNewUserPeriodType(period){
        return function(){
            this.props.dispatch(Actions.DashboardActions.changeNewUserPeriodType(period));
        }.bind(this);
    }
}

DashboardPage.propTypes = {
    isFetching: PropTypes.bool,
    totalUserNum: PropTypes.number,
    weeklyActiveUserNum: PropTypes.number,
    totalMessagesNum: PropTypes.number,
    totalReceivedNum: PropTypes.number,
    activeUser: PropTypes.object,
    activeUserPeriodType: PropTypes.string,
    newUser: PropTypes.object,
    newUserPeriodType: PropTypes.string,
    receivedNum: PropTypes.number,
    sentNum: PropTypes.number,
    sparklineReceived: PropTypes.array,
    sparklineSent: PropTypes.array,
    recentMessages: PropTypes.array,
    hyperlinkMessages: PropTypes.array,
    currentBot: PropTypes.object
};

const IsFetchingSelector = state => state.dashboard.isFetching;
const TotalUserNumSelector = state => state.dashboard.totalUserNum;
const WeeklyActiveUserNumSelector = state => state.dashboard.weeklyActiveUserNum;
const TotalMessagesNumSelector = state => state.dashboard.totalMessagesNum;
const TotalReceivedNumSelector = state => state.dashboard.totalReceivedNum;
const ActiveUserSelector = state => state.dashboard.activeUser;
const ActiveUserPeriodTypeSelector = state => state.dashboard.activeUserPeriodType;
const NewUserSelector = state => state.dashboard.newUser;
const NewUserPeriodTypeSelector = state => state.dashboard.newUserPeriodType;
const ReceivedNumSelector = state => state.dashboard.receivedNum;
const SentNumSelector = state => state.dashboard.sentNum;
const SparklineReceivedSelector = state => state.dashboard.sparklineReceived;
const SparklineSentSelector = state => state.dashboard.sparklineSent;
const RecentMessagesSelector = state => state.dashboard.recentMessages;
const HyperlinkMessagesSelector = state => state.dashboard.hyperlinkMessages;

const CurrentBotSelector = state => state.bots.currentBot;

function select(state){
    return {
        isFetching: IsFetchingSelector(state),
        totalUserNum: TotalUserNumSelector(state),
        weeklyActiveUserNum: WeeklyActiveUserNumSelector(state),
        totalMessagesNum: TotalMessagesNumSelector(state),
        totalReceivedNum: TotalReceivedNumSelector(state),
        activeUser: ActiveUserSelector(state),
        activeUserPeriodType: ActiveUserPeriodTypeSelector(state),
        newUser: NewUserSelector(state),
        newUserPeriodType: NewUserPeriodTypeSelector(state),
        receivedNum: ReceivedNumSelector(state),
        sentNum: SentNumSelector(state),
        sparklineReceived: SparklineReceivedSelector(state),
        sparklineSent: SparklineSentSelector(state),
        recentMessages: RecentMessagesSelector(state),
        hyperlinkMessages: HyperlinkMessagesSelector(state),
        currentBot: CurrentBotSelector(state)
    };
}

export default withRouter(connect(select)(DashboardPage));
