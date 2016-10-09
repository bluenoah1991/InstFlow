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
            <div className="note note-info">
                <h4 className="block">{this.props.title}</h4>
                <p> {this.props.note} </p>
            </div>
        );
    }
});

export var AdvanceNoteComponent = React.createClass({
    render: function(){
        return (
            <div className="alert alert-block alert-info fade in">
                <button type="button" className="close" data-dismiss="alert"></button>
                <h4 className="alert-heading">{this.props.title || 'Information!'}</h4>
                <p> {this.props.content} </p>
                <p>
                    <a className="btn purple" href=""> {this.props.button} </a>
                </p>
            </div>
        );
    }
});
