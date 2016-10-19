import React from 'react';

import PageTitleComponent from '../components/PageTitleComponent';
import PageToolbarComponent from '../components/PageToolbarComponent';

export default React.createClass({
    render: function(){
        return (
            <div className="page-head">
                <PageTitleComponent title={this.props.title} />
            </div>
        );
    }
});