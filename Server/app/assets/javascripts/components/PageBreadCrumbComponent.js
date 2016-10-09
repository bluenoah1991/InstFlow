import React from 'react';

/**
 * this.props.paths = [
 *      {title: 'title1', href: 'title1.html'},
 *      {title: 'title2', href: 'title2.html'},
 *      {title: 'title3', href: 'title3.html'},
 *      {title: 'last'}
 * ]
 */
export default React.createClass({
    render: function(){
        var items = [];
        var len = this.props.paths.length;
        this.props.paths.forEach(function(path, index){
            let title = path.title;
            if(index < len - 1){
                let href = path.href;
                items.push(
                    <li key={index}>
                        <a href={href}>{title}</a>
                        <i className="fa fa-circle"></i>
                    </li>
                );
            } else {
                items.push(
                    <li key={index}>
                        <span className="active">{title}</span>
                    </li>
                );
            }
        });

        return (
            <ul className="page-breadcrumb breadcrumb">
                {items}
            </ul>
        );
    }
});