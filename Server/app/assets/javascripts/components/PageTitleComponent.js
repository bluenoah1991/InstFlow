import React from 'react';

export default React.createClass({
    render: function(){
        return (
            <div className="page-title">
                <h1>{this.props.title}</h1>
            </div>
        );
    }
});