import React, {Component, PropTypes, Children} from 'react';

class PageContentComponent extends Component{
    render(){
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PageContentComponent;
