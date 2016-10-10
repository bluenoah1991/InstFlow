import React from 'react';

import {ButtonComponent} from '../components/ButtonComponent';

export var ConnectStateComponent = React.createClass({
    render: function(){
        const states = {
            init: <ButtonComponent color='green' size='xs' text='Connect' />,
            connecting: <ButtonComponent color='green' size='xs' icon='spinner' spin={true} text='Connecting' />,
            connected: <ButtonComponent color='green' size='xs' icon='check' text='Connected' enabled={false} />,
            error: [
                <ButtonComponent key={0} color='red' size='xs' icon='remove' text='Rejected' enabled={false} />,
                <ButtonComponent key={1} color='green' size='xs' text='Reconnect' />
            ]
        };
        let state = states[this.props.state];
        if(state == undefined){
            state = [];
        }
        return <div className="btn-toolbar">
            {state}
        </div>
    },
    propTypes: {
        state: React.PropTypes.string
    }
});
