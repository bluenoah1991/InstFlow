import React from 'react';

export var RowComponent = React.createClass({
    render: function(){
        return (
            <div className="row">
                {this.props.children}
            </div>
        );
    }
});

export var ColComponent = React.createClass({
    render: function(){
        return (
            <div className={`col-md-${this.props.size}`}>
                {this.props.children}
            </div>
        );
    }
});

export var PortletComponent = React.createClass({
    render: function(){
        return (
            <div className="portlet light bordered">
                <div className="portlet-title">
                    <div className="caption font-green-haze">
                        <i className="icon-settings font-green-haze"></i>
                        <span className="caption-subject bold uppercase">{this.props.title}</span>
                    </div>
                </div>
                <div className={`portlet-body ${this.props.extclass}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});