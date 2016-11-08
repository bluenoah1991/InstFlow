import React, {Component, PropTypes, Children} from 'react';
import _ from 'underscore';

class ScrollListComponent extends Component{
    constructor(){
        super();
        this.state = {
            id: _.uniqueId('scroll_')
        };
    }

    render(){
        let data = this.props.data != undefined ? this.props.data : [];
        let items = data.map(function(item, index){
            return (
                <div key={index} className="item">
                    <div className="item-head">
                        <div className="item-details">
                            <a href="" className="item-name primary-link">{item.title}</a>
                            <span className="item-label">{item.time}</span>
                        </div>
                    </div>
                    <div className="item-body"> {item.summary} </div>
                </div>
            );
        });

        return (
            <div id={this.state.id} className="scroller">
                <div className="general-item-list">
                    {items}
                </div>
            </div>
        );
    }

    componentDidUpdate(){
        $(`#${this.state.id}`).slimScroll({
            height: '320px'
        });
    }

    componentDidMount(){
        $(`#${this.state.id}`).slimScroll({
            height: '320px'
        });
    }
}

ScrollListComponent.propTypes = {
    data: PropTypes.array
};

export default ScrollListComponent;