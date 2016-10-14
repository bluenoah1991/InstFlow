import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';

import * as Actions from '../actions';

class RootComponent extends Component{
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default RootComponent;
