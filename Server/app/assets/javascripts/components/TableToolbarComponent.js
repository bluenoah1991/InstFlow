import React, {Component, PropTypes, Children} from 'react';

export class TableToolbarComponent extends Component{
    render(){
        return (
            <div className="table-toolbar">
                <div className="row">
                    <div className="col-md-6">
                        <div className="btn-toolbar">
                            {this.props.left}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="btn-toolbar pull-right">
                            {this.props.right}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TableToolbarComponent.propTypes = {
    left: PropTypes.arrayOf(PropTypes.element),
    right: PropTypes.arrayOf(PropTypes.element)
};
