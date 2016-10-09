import React from 'react';

export default React.createClass({
    render: function(){
        return (
            <div className="page-content">
                {this.props.children}
            </div>
        );
    }
});