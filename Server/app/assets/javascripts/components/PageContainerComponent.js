import React, {Component, PropTypes, Children} from 'react';

class PageContainerComponent extends Component{
    render(){
        return (
            <div className="page-container">
                {this.props.children}
            </div>
        );
    }
}

export default PageContainerComponent;
