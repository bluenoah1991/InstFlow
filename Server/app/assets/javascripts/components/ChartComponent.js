import React, {Component, PropTypes, Children} from 'react';
import _ from 'underscore';

class ChartComponent extends Component{
    constructor(){
        super();
        this.state = {
            id: _.uniqueId('chart_'),
            tooltip_id: _.uniqueId('tooltip_')
        };
    }

    render(){
        let isFetching = this.props.isFetching != undefined ? this.props.isFetching : false;

        if(isFetching){
            return <img src="/assets/global/img/loading.gif" alt="loading" />
        } else {
            return <div id={this.state.id} className="chart"> </div>;
        }
    }

    update(){
        let isFetching = this.props.isFetching != undefined ? this.props.isFetching : false;
        let data = this.props.data != undefined ? this.props.data : [];
        let unit = this.props.unit != undefined ? this.props.unit : '';

        if(isFetching || data.length === 0){
            return;
        }
        
        let showChartTooltip = function(x, y, xValue, yValue) {
            $(`<div id="${this.state.tooltip_id}" class="chart-tooltip">` + yValue + '<\/div>').css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x - 40,
                border: '0px solid #ccc',
                padding: '2px 6px',
                'background-color': '#fff'
            }).appendTo("body").fadeIn(200);
        }.bind(this);

        let plot = null;
        if(this.props.style == 'red'){
            plot = $.plot($(`#${this.state.id}`), [
                {data: data, lines: {fill: 0.6, lineWidth: 0}, color: ['#f89f9f']}, 
                {data: data, points: {show: true, fill: true, radius: 5, fillColor: "#f89f9f", lineWidth: 3}, color: '#fff', shadowSize: 0}
                ], {xaxis: {tickLength: 0, tickDecimals: 0, mode: "categories", min: 0, 
                font: {lineHeight: 14, style: "normal", variant: "small-caps", color: "#6F7B8A"}},
                yaxis: {ticks: 5, tickDecimals: 0, tickColor: "#eee",
                font: {lineHeight: 14, style: "normal", variant: "small-caps", color: "#6F7B8A"}},
                grid: {hoverable: true, clickable: true, tickColor: "#eee", borderColor: "#eee", borderWidth: 1}
            });
        } else if(this.props.style == 'blue'){
            plot = $.plot($(`#${this.state.id}`), [
                {data: data, lines: {fill: 0.2, lineWidth: 0}, color: ['#BAD9F5']}, 
                {data: data, points: {show: true, fill: true, radius: 4, fillColor: "#9ACAE6", lineWidth: 2}, color: '#9ACAE6', shadowSize: 1},
                {data: data, lines: {show: true, fill: false, lineWidth: 3}, color: '#9ACAE6', shadowSize: 0},
                ], {xaxis: {tickLength: 0, tickDecimals: 0, mode: "categories", min: 0, 
                font: {lineHeight: 18, style: "normal", variant: "small-caps", color: "#6F7B8A"}},
                yaxis: {ticks: 5, tickDecimals: 0, tickColor: "#eee",
                font: {lineHeight: 14, style: "normal", variant: "small-caps", color: "#6F7B8A"}},
                grid: {hoverable: true, clickable: true, tickColor: "#eee", borderColor: "#eee", borderWidth: 1}
            });
        }

        var previousPoint = null;
        $(`#${this.state.id}`).bind("plothover", function(event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));
            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;

                    $(`#${this.state.tooltip_id}`).remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);

                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ` ${unit}`);
                }
            } else {
                $(`#${this.state.tooltip_id}`).remove();
                previousPoint = null;
            }
        }.bind(this));
    }

    componentDidUpdate(){
        this.update();
    }

    componentDidMount(){
        this.update();
    }
}

ChartComponent.propTypes = {
    isFetching: PropTypes.bool,
    data: PropTypes.array,
    unit: PropTypes.string,
    style: PropTypes.string
};

export default ChartComponent;