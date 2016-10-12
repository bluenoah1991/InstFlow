import React from 'react';

export var Modal2Component = React.createClass({
    render: function(){
        return (
            <div className="modal fade" id={this.props.id} tabIndex="-1" role="basic" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body"> {this.props.body} </div>
                        <div className="modal-footer">
                            <button type="button" className="btn dark btn-outline" data-dismiss="modal">Close</button>
                            <button type="button" className="btn green action-cont" data-dismiss="modal" onClick={this.handleCont}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    componentDidMount: function(){
        $(`#${this.props.id}`).on('show.bs.modal', function(e){
            var target = $(e.relatedTarget);
            this.setState({
                data: target.data()
            });
        }.bind(this));
    },
    handleCont: function(){
        this.props.context.emit(this.props.eventName, this.state.data);
    }
});
