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
        if(this.editor != undefined){
            if(this.props.value != undefined){
                if(this.value != this.props.value){
                    this.editor.set(this.props.value);
                }
                this.value = this.props.value;
            } else {
                this.editor.reset();
            }
        }
        if(this.state.meltKey != this.props.meltKey){
            this.setState({
                meltKey: this.props.meltKey
            });
        } else {
            if(this.props.freeze != undefined && this.props.freeze){
                return;
            }
        }
        this.editor = new Editor(this.state.id);
        this.editor.init(function(contents, $editable){
            if(this.props.onChange != undefined){
                this.props.onChange(contents);
            }
        }.bind(this));
    }

    componentDidMount(){
        this.editor = new Editor(this.state.id);
        this.editor.init(function(contents, $editable){
            if(this.props.onChange != undefined){
                this.props.onChange(contents);
            }
        }.bind(this));
        if(this.props.value != undefined){
            this.editor.set(this.props.value);
            this.value = this.props.value;
        } else {
            this.editor.reset();
        }
    }
}

EditorComponent.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    freeze: PropTypes.bool,
    meltKey: PropTypes.string
};

export default EditorComponent;