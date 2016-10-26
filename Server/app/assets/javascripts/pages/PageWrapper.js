import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import _ from 'underscore';

import * as Actions from '../actions';
import * as Utils from '../utils';

class PageWrapper extends Component{
    render(){
        let key = _.uniqueId('key_');
        if(this.props.currentBot != undefined){
            key = `key_${this.props.currentBot.id}`;
        }
        return React.createElement(this.props.component, {key: key});
    }
}

PageWrapper.propTypes = {
    component: PropTypes.func.isRequired,
    currentBot: PropTypes.object
};

const CurrentBotSelector = state => state.bots.currentBot;

function select(state){
    return {
        currentBot: CurrentBotSelector(state)
    };
}

export default withRouter(connect(select)(PageWrapper));