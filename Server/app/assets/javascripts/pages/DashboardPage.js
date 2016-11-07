import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import PageContentComponent from '../components/PageContentComponent';
import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import CounterComponent from '../components/CounterComponent';
import ChartComponent from '../components/ChartComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class DashboardPage extends Component{
    render(){
		let isFetching = this.props.isFetching != undefined ? this.props.isFetching : false;
		let totalUserNum = this.props.totalUserNum != undefined ? this.props.totalUserNum : 0;
		let weeklyActiveUserNum = this.props.weeklyActiveUserNum != undefined ? this.props.weeklyActiveUserNum : 0;
		let totalMessagesNum = this.props.totalMessagesNum != undefined ? this.props.totalMessagesNum : 0;
		let totalReceivedNum = this.props.totalReceivedNum != undefined ? this.props.totalReceivedNum : 0;
        let activeUser = this.props.activeUser != undefined ? this.props.activeUser : {};
        let activeUserPeriodType = this.props.activeUserPeriodType != undefined ? this.props.activeUserPeriodType : 'weekly';
        activeUser = activeUser[activeUserPeriodType];

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
                                <ChartComponent isFetching={isFetching} unit='users' data={activeUser} />
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
                                <div id="site_activities_loading">
                                    <img src="../assets/global/img/loading.gif" alt="loading" /> </div>
                                <div id="site_activities_content" className="display-none">
                                    <div id="site_activities" className="chart"> </div>
                                </div>
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
                                                <div id="sparkline_bar"></div>
                                            </div>
                                            <div className="stat-number">
                                                <div className="title"> Received </div>
                                                <div className="number"> 2460 </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <div className="stat-right">
                                            <div className="stat-chart">
                                                <div id="sparkline_bar2"></div>
                                            </div>
                                            <div className="stat-number">
                                                <div className="title"> Sent </div>
                                                <div className="number"> 719 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-scrollable table-scrollable-borderless">
                                    <table className="table table-hover table-light">
                                        <thead>
                                            <tr className="uppercase">
                                                <th> USER </th>
                                                <th> AGENT </th>
                                                <th> SENT </th>
                                                <th> RECEIVED </th>
                                                <th> LAST ACTIVE </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <a href="javascript:;" className="primary-link">Brain</a>
                                                </td>
                                                <td> Skype </td>
                                                <td> 45 </td>
                                                <td> 124 </td>
                                                <td> 3 hrs ago </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="javascript:;" className="primary-link">Brain</a>
                                                </td>
                                                <td> Skype </td>
                                                <td> 45 </td>
                                                <td> 124 </td>
                                                <td> 3 hrs ago </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="javascript:;" className="primary-link">Brain</a>
                                                </td>
                                                <td> Skype </td>
                                                <td> 45 </td>
                                                <td> 124 </td>
                                                <td> 3 hrs ago </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="javascript:;" className="primary-link">Brain</a>
                                                </td>
                                                <td> Skype </td>
                                                <td> 45 </td>
                                                <td> 124 </td>
                                                <td> 3 hrs ago </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="portlet light bordered">
                            <div className="portlet-title">
                                <div className="caption caption-md">
                                    <i className="icon-bar-chart font-dark hide"></i>
                                    <span className="caption-subject font-dark bold uppercase">Hyperlink Messages</span>
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
                                <div className="scroller" style={{height: '338px'}} data-always-visible="1" data-rail-visible1="0" data-handle-color="#D7DCE2">
                                    <div className="general-item-list">
                                        <div className="item">
                                            <div className="item-head">
                                                <div className="item-details">
                                                    <a href="" className="item-name primary-link">Syrph fscfhew qedwzp esyicr xfd lgphodjaus jmkh efhz kyoduknml</a>
                                                    <span className="item-label">3 hrs ago</span>
                                                </div>
                                            </div>
                                            <div className="item-body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>
                                        </div>
                                        <div className="item">
                                            <div className="item-head">
                                                <div className="item-details">
                                                    <a href="" className="item-name primary-link">Syrph fscfhew qedwzp esyicr xfd lgphodjaus jmkh efhz kyoduknml</a>
                                                    <span className="item-label">3 hrs ago</span>
                                                </div>
                                            </div>
                                            <div className="item-body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>
                                        </div>
                                        <div className="item">
                                            <div className="item-head">
                                                <div className="item-details">
                                                    <a href="" className="item-name primary-link">Syrph fscfhew qedwzp esyicr xfd lgphodjaus jmkh efhz kyoduknml</a>
                                                    <span className="item-label">3 hrs ago</span>
                                                </div>
                                            </div>
                                            <div className="item-body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>
                                        </div>
                                        <div className="item">
                                            <div className="item-head">
                                                <div className="item-details">
                                                    <a href="" className="item-name primary-link">Syrph fscfhew qedwzp esyicr xfd lgphodjaus jmkh efhz kyoduknml</a>
                                                    <span className="item-label">3 hrs ago</span>
                                                </div>
                                            </div>
                                            <div className="item-body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>
                                        </div>
                                        <div className="item">
                                            <div className="item-head">
                                                <div className="item-details">
                                                    <a href="" className="item-name primary-link">Syrph fscfhew qedwzp esyicr xfd lgphodjaus jmkh efhz kyoduknml</a>
                                                    <span className="item-label">3 hrs ago</span>
                                                </div>
                                            </div>
                                            <div className="item-body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>
                                        </div>
                                        <div className="item">
                                            <div className="item-head">
                                                <div className="item-details">
                                                    <a href="" className="item-name primary-link">Syrph fscfhew qedwzp esyicr xfd lgphodjaus jmkh efhz kyoduknml</a>
                                                    <span className="item-label">3 hrs ago</span>
                                                </div>
                                            </div>
                                            <div className="item-body"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageContentComponent>
        );
    }

    componentDidMount(){
        this.props.dispatch(Actions.DashboardActions.fetchDashboard());
    }

    handleChangeActiveUserPeriodType(period){
        return function(){
            this.props.dispatch(Actions.DashboardActions.changeActiveUserPeriodType(period));
        }.bind(this);
    }
}

const IsFetchingSelector = state => state.dashboard.isFetching;
const TotalUserNumSelector = state => state.dashboard.totalUserNum;
const WeeklyActiveUserNumSelector = state => state.dashboard.weeklyActiveUserNum;
const TotalMessagesNumSelector = state => state.dashboard.totalMessagesNum;
const TotalReceivedNumSelector = state => state.dashboard.totalReceivedNum;
const ActiveUserSelector = state => state.dashboard.activeUser;
const ActiveUserPeriodTypeSelector = state => state.dashboard.activeUserPeriodType;

function select(state){
    return {
        isFetching: IsFetchingSelector(state),
        totalUserNum: TotalUserNumSelector(state),
        weeklyActiveUserNum: WeeklyActiveUserNumSelector(state),
        totalMessagesNum: TotalMessagesNumSelector(state),
        totalReceivedNum: TotalReceivedNumSelector(state),
        activeUser: ActiveUserSelector(state),
        activeUserPeriodType: ActiveUserPeriodTypeSelector(state)
    };
}

export default connect(select)(DashboardPage);