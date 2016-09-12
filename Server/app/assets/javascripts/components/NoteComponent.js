import React from 'react';

export default React.createClass({
    render: function(){
        return (
            <div className="note note-info">
                <p>{this.props.note}</p>
            </div>
        );
    }
});