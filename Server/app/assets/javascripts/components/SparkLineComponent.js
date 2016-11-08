import React, {Component, PropTypes, Children} from 'react';
import _ from 'underscore';

class SparkLineComponent extends Component{
    constructor(){
        super();
        this.state = {
            id: _.uniqueId('sparkline_')
        };
    }

    render(){
        return <div id={this.state.id}></div>
    }

    update(){
        if(this.props.data != undefined && this.props.data.length > 0){
            $(`#${this.state.id}`).sparkline(this.props.data, {
                type: 'bar',
                width: '100',
                barWidth: 5,
                height: '55',
                barColor: this.props.barColor != undefined ? this.props.barColor : '#f36a5b',
                negBarColor: this.props.negBarColor != undefined ? this.props.negBarColor : '#e02222'
            });
        }
    }

    componentDidUpdate(){
        this.update();
    }

    componentDidMount(){
        this.update();
    }
}

SparkLineComponent.propTypes = {
    data: PropTypes.array,
    barColor: PropTypes.string,
    negBarColor: PropTypes.string
};

export default SparkLineComponent;

