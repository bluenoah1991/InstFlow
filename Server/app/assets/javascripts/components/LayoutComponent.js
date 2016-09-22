import React from 'react';
import _ from 'underscore';

export var RowComponent = React.createClass({
    render: function(){
        return (
            <div className="row">
                {this.props.children}
            </div>
        );
    }
});

export var ColComponent = React.createClass({
    render: function(){
        return (
            <div className={`col-md-${this.props.size}`}>
                {this.props.children}
            </div>
        );
    }
});

export var PortletComponent = React.createClass({
    render: function(){
        return (
            <div className="portlet light bordered">
                <div className="portlet-title">
                    <div className="caption font-green-haze">
                        <i className="icon-settings font-green-haze"></i>
                        <span className="caption-subject bold uppercase">{this.props.title}</span>
                    </div>
                </div>
                <div className={`portlet-body ${this.props.extclass}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

/**
 * this.props.tabs = [
 *      {title: 'Personal Info', component: Your Component, active: true}
 * ];
 */
export var PortletTabComponent = React.createClass({
    render: function(){
        let tabs = [];
        let tab_contents = [];
        this.props.tabs.forEach(function(tab, index){
            let id = _.uniqueId('tab_');
            tabs.push(
                <li key={index} className={tab.active != undefined && tab.active ? 'active' : ''}>
                    <a href={`#${id}`} data-toggle="tab">{tab.title}</a>
                </li>
            );
            tab_contents.push(
                <div key={index} className={`tab-pane ${tab.active != undefined && tab.active ? 'active' : ''}`} id={id}>
                    {tab.component}
                </div>
            );
        });

        return (
            <div className="portlet light bordered">
                <div className="portlet-title tabbable-line">
                    <div className="caption caption-md">
                        <i className="icon-globe theme-font hide"></i>
                        <span className="caption-subject font-blue-madison bold uppercase">{this.props.title}</span>
                    </div>
                    <ul className="nav nav-tabs">
                        {tabs}
                    </ul>
                </div>
                <div className="portlet-body">
                    <div className="tab-content">
                        {tab_contents}
                    </div>
                </div>
            </div>
        );
    }
});

export var TabContentComponent = React.createClass({
    render: function(){
        return (
            <div class="col-md-9 col-sm-9 col-xs-9">
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_7_1">
                        <p> Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                            butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher
                            voluptate nisi qui. </p>
                    </div>
                    <div class="tab-pane fade" id="tab_7_2">
                        <p> Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table
                            craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.
                            Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel.
                            Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park. </p>
                    </div>
                    <div class="tab-pane fade" id="tab_7_3">
                        <p> Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone
                            skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork
                            biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr. </p>
                    </div>
                    <div class="tab-pane fade" id="tab_7_4">
                        <p> Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party
                            locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral, mustache readymade
                            thundercats keffiyeh craft beer marfa ethical. Wolf salvia freegan, sartorial keffiyeh echo park vegan. </p>
                    </div>
                </div>
            </div>
        );
    }
});

export var TabRightComponent = React.createClass({
    render: function(){
        return (
            <div class="col-md-3 col-sm-3 col-xs-3">
                <ul class="nav nav-tabs tabs-right">
                    <li class="active">
                        <a href="#tab_7_1" data-toggle="tab"> Home </a>
                    </li>
                    <li>
                        <a href="#tab_7_2" data-toggle="tab"> Profile </a>
                    </li>
                    <li class="dropdown">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"> More
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <li>
                                <a href="#tab_7_3" tabindex="-1" data-toggle="tab"> Option 1 </a>
                            </li>
                            <li>
                                <a href="#tab_7_4" tabindex="-1" data-toggle="tab"> Option 2 </a>
                            </li>
                            <li>
                                <a href="#tab_7_3" tabindex="-1" data-toggle="tab"> Option 3 </a>
                            </li>
                            <li>
                                <a href="#tab_7_4" tabindex="-1" data-toggle="tab"> Option 4 </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#tab_7_1" data-toggle="tab"> Settings </a>
                    </li>
                    <li>
                        <a href="#tab_7_1" data-toggle="tab"> More </a>
                    </li>
                </ul>
            </div>
        );
    }
});