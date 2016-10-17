import React, {Component, PropTypes, Children} from 'react';

class PageFooterComponent extends Component{
    render(){
        return (
            <div className="page-footer">
                <div className="page-footer-inner"> 2016 &copy; 
                    <a target="_blank" href="http://www.instflow.com">InstFlow</a> &nbsp;|&nbsp;
                    <a href="http://www.instflow.com/contactus" title="Contact US" target="_blank">Contact US</a>
                </div>
                <div className="scroll-to-top">
                    <i className="icon-arrow-up"></i>
                </div>
            </div>
        );
    }
}

export default PageFooterComponent;
