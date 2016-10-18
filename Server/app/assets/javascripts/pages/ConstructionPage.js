import React, {Component, PropTypes} from 'react';

import {RowComponent, ColComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';

export class ConstructionPage extends Component{
    render(){
        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'Coming Soon', href: '#/construction'}
        ];
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="Coming Soon" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12" extendClass="construction">
                            <img className="image" src="/assets/pages/img/robot.png" />
                            <div className="details">
                                <h3>Coming Soon!</h3>
                                <p> At vero eos et accusamus et iusto odio dignissimos ducimus.
                                    <br />
                                    Ut non libero magna fusce condimentum. </p>
                                <p>
                                    <a href="#/" className="btn blue btn-outline"> Return home </a>
                                    <br /> </p>                            
                            </div>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
}