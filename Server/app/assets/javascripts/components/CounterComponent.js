import React, {Component, PropTypes, Children} from 'react';

class CounterComponent extends Component{
    render(){
        let title = this.props.title != undefined ? this.props.title : '';
        let unit = this.props.unit != undefined ? this.props.unit : '';
        let icon = this.props.icon != undefined ? `icon-${this.props.icon}` : '';
        let color = this.props.color != undefined ? `bg-${this.props.color}` : '';
        let value = this.props.value != undefined ? this.props.value : 0;

        return (
            <div className="widget-thumb widget-bg-color-white text-uppercase margin-bottom-20 bordered">
                <h4 className="widget-thumb-heading">{title}</h4>
                <div className="widget-thumb-wrap">
                    <i className={`widget-thumb-icon ${color} ${icon}`}></i>
                    <div className="widget-thumb-body">
                        <span className="widget-thumb-subtitle">{unit}</span>
                        <span className="widget-thumb-body-stat">{value}</span>
                    </div>
                </div>
            </div>
        );
    }
}

CounterComponent.propTypes = {
    title: PropTypes.string,
    unit: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.number
};

export default CounterComponent;