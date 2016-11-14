import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

class EditorComponent extends Component{
    constructor(){
        super();
        this.state = {
            id: _.uniqueId('editor_')
        };
    }

    render(){
        return (
            <div id={this.state.id}> </div>
        );
    }

    componentDidUpdate(){
        if(!this.focus){
            if(this.props.value != undefined){
                if(this.props.value != this.preValue){
                    this.editor.summernote('code', this.props.value);
                }
                this.preValue = this.props.value;
            } else {
                this.editor.summernote('reset');
            }
        }
    }

    componentDidMount(){
        this.editor = $(`#${this.state.id}`);
        this.editor.summernote({
            height: 300,
            callbacks: {
                onChange: this.props.onChange,
                onFocus: function(){
                    this.focus = true;
                }.bind(this),
                onBlur: function(){
                    this.focus = false;
                }.bind(this)
            }
        });

        if(this.props.value != undefined){
            this.editor.summernote('code', this.props.value);
            this.preValue = this.props.value;
        } else {
            this.editor.summernote('reset');
        }
    }
}

EditorComponent.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default EditorComponent;