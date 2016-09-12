import React from 'react';

export default React.createClass({
    render: function(){
        return (
            <div className="page-toolbar">
                <div className="btn-group btn-theme-panel">
                    <a href="javascript:;" className="btn dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-settings"></i>
                    </a>
                    <div className="dropdown-menu theme-panel pull-right dropdown-custom hold-on-click">
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <h3>HEADER</h3>
                                <ul className="theme-colors">
                                    <li className="theme-color theme-color-default active" data-theme="default">
                                        <span className="theme-color-view"></span>
                                        <span className="theme-color-name">Dark Header</span>
                                    </li>
                                    <li className="theme-color theme-color-light " data-theme="light">
                                        <span className="theme-color-view"></span>
                                        <span className="theme-color-name">Light Header</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-12 seperator">
                                <h3>LAYOUT</h3>
                                <ul className="theme-settings">
                                    <li> Layout
                                        <select className="layout-option form-control input-small input-sm" defaultValue="fluid">
                                            <option value="fluid">Fluid</option>
                                            <option value="boxed">Boxed</option>
                                        </select>
                                    </li>
                                    <li> Header
                                        <select className="page-header-option form-control input-small input-sm" defaultValue="fixed">
                                            <option value="fixed">Fixed</option>
                                            <option value="default">Default</option>
                                        </select>
                                    </li>
                                    <li> Top Dropdowns
                                        <select className="page-header-top-dropdown-style-option form-control input-small input-sm" defaultValue="dark">
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                        </select>
                                    </li>
                                    <li> Sidebar Mode
                                        <select className="sidebar-option form-control input-small input-sm" defaultValue="default">
                                            <option value="fixed">Fixed</option>
                                            <option value="default">Default</option>
                                        </select>
                                    </li>
                                    <li> Sidebar Menu
                                        <select className="sidebar-menu-option form-control input-small input-sm" defaultValue="accordion">
                                            <option value="accordion">Accordion</option>
                                            <option value="hover">Hover</option>
                                        </select>
                                    </li>
                                    <li> Sidebar Position
                                        <select className="sidebar-pos-option form-control input-small input-sm" defaultValue="left">
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </li>
                                    <li> Footer
                                        <select className="page-footer-option form-control input-small input-sm" defaultValue="default">
                                            <option value="fixed">Fixed</option>
                                            <option value="default">Default</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});