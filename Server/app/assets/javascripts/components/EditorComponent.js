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
        if(this.state.meltKey != this.props.meltKey){
            this.setState({
                meltKey: this.props.meltKey
            });
        } else {
            if(this.props.freeze != undefined && this.props.freeze){
                return;
            }
        }
        let editor = new Editor(this.state.id);
        editor.init();
        if(this.props.value != undefined){
            editor.set(this.props.value);
        }
        editor.onChange(function(contents, $editable){
            if(this.props.onChange != undefined){
                this.props.onChange(contents);
            }
        }.bind(this));
    }

    componentDidMount(){
        let editor = new Editor(this.state.id);
        editor.init();
        if(this.props.value != undefined){
            editor.set(this.props.value);
        }
        editor.onChange(function(contents, $editable){
            if(this.props.onChange != undefined){
                this.props.onChange(contents);
            }
        }.bind(this));
    }
}

EditorComponent.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    freeze: PropTypes.bool,
    meltKey: PropTypes.string
};

export default EditorComponent;