import React, {Component, PropTypes} from 'react';

import {ButtonComponent} from '../components/ButtonComponent';

export class ConnectStateComponent extends Component{
    render(){
        const states = {
            init: <ButtonComponent color='green' size='xs' text='Connect' onClick={this.props.onClick} />,
            connecting: <ButtonComponent color='green' size='xs' icon='spinner' spin={true} text='Connecting' />,
            connected: <ButtonComponent color='green' size='xs' icon='check' text='Connected' enabled={false} />,
            error: [
                <ButtonComponent key={0} color='red' size='xs' icon='remove' text='Rejected' enabled={false} />,
                <ButtonComponent key={1} color='green' size='xs' text='Reconnect' onClick={this.props.onClick} />
            ]
        };
        let state = states[this.props.state];
        if(state == undefined){
            state = [];
        }
        return <div className="btn-toolbar">
            {state}
        </div>
    }
}

ConnectStateComponent.propTypes = {
    state: React.PropTypes.oneOf(['init', 'connecting', 'connected', 'error']),
    onClick: React.PropTypes.func
}

export class SendStateComponent extends Component{
    render(){
        const states = {
            init: <ButtonComponent color='blue' icon='send' text='Send' onClick={this.props.onClick} />,
            sending: <ButtonComponent color='blue' icon='spinner' spin={true} text='Sending' onClick={this.props.onClick} />
        };
        let state = states[this.props.state];
        if(state == undefined){
            state = [];
        }
        return state;
    }
}

SendStateComponent.propTypes = {
    state: React.PropTypes.oneOf(['init', 'sending']),
    onClick: React.PropTypes.func
}
