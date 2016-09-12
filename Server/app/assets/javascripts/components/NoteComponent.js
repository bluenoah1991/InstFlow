import React from 'react';

export var NoteComponent = React.createClass({
    render: function(){
        return (
            <div className="note note-info">
                <p>{this.props.note}</p>
            </div>
        );
    }
});

export var NoteWithTitleComponent = React.createClass({
    render: function(){
        return (
            <div class="note note-info">
                <h4 class="block">{this.props.title}</h4>
                <p> {this.props.note} </p>
            </div>
        );
    }
});