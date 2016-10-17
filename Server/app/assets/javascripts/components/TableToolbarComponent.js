import React, {Component, PropTypes, Children} from 'react';

export class TableToolbarComponent extends Component{
    render(){
        return (
            <div className="table-toolbar">
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-toolbar">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
